/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
import {
  Component,
  Entity,
  Engine,
  Scene,
  Space,
  System,
  World,
  WorldProvider,
} from '@rapidajs/rapida';
import geckos, { ClientChannel } from '@geckos.io/client';
import * as React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import { useFirstRender } from './hooks';
import './styles.scss';

class PlayerMesh extends Component {
  gameScene: Scene;

  cube: Mesh;

  constructor({ gameScene }: { gameScene: Scene }) {
    super();
    this.gameScene = gameScene;

    const geometry = new BoxGeometry(50, 50, 50);
    const material = new MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.cube = new Mesh(geometry, material);
  }

  onInit = (): void => {
    this.gameScene.add(this.cube);
  };

  onDestroy = (): void => {
    this.gameScene.remove(this.cube!);
  };
}

class PlayerControls extends Component {
  playerMesh?: PlayerMesh;

  up = false;

  down = false;

  left = false;

  right = false;

  dirty = false;

  onInit = (): void => {
    this.playerMesh = this.entity.get(PlayerMesh) as PlayerMesh;

    const W_KEY = 87;
    const S_KEY = 83;
    const A_KEY = 65;
    const D_KEY = 68;

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      const keyCode = event.which;

      if (keyCode === W_KEY) {
        this.up = true;
      } else if (keyCode === S_KEY) {
        this.down = true;
      } else if (keyCode === A_KEY) {
        this.left = true;
      } else if (keyCode === D_KEY) {
        this.right = true;
      }
    };

    const onDocumentKeyUp = (event: KeyboardEvent) => {
      const keyCode = event.which;

      if (keyCode === W_KEY) {
        this.up = false;
      } else if (keyCode === S_KEY) {
        this.down = false;
      } else if (keyCode === A_KEY) {
        this.left = false;
      } else if (keyCode === D_KEY) {
        this.right = false;
      }
    };

    document.addEventListener('keyup', onDocumentKeyUp, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
  };

  onUpdate = (timeElapsed: number) => {
    const scalar = 0.1;
    let dirty = false;

    const playerMesh = this.playerMesh as PlayerMesh;

    const { position } = playerMesh.cube;
    if (this.up) {
      position.y += scalar * timeElapsed;
      dirty = true;
    }
    if (this.down) {
      position.y -= scalar * timeElapsed;
      dirty = true;
    }
    if (this.left) {
      position.x -= scalar * timeElapsed;
      dirty = true;
    }
    if (this.right) {
      position.x += scalar * timeElapsed;
      dirty = true;
    }

    if (dirty) {
      this.dirty = true;
      playerMesh.cube.position.copy(position);
    }
  };
}

class PlayerNetworkManager extends Component {
  playerId: string;

  playerMesh?: PlayerMesh;

  playerControls?: PlayerControls;

  io: ClientChannel;

  constructor({ playerId, io }: { playerId: string; io: ClientChannel }) {
    super();
    this.playerId = playerId;
    this.io = io;
  }

  onInit = (): void => {
    this.playerMesh = this.entity.get(PlayerMesh) as PlayerMesh;
    this.playerControls = this.entity.get(PlayerControls) as PlayerControls;

    this.io.on('player-position-update', (d) => {
      const data = d as { x: number; y: number; z: number };
      this.playerMesh?.cube.position.set(data.x, data.y, data.z);
    });
  };

  onUpdate = (_timeElapsed: number) => {
    if (this.playerControls?.dirty) {
      this.playerControls.dirty = false;

      this.io.emit('player-frame', {
        id: this.playerId,
        x: this.playerMesh?.cube.position.x,
        y: this.playerMesh?.cube.position.y,
        z: this.playerMesh?.cube.position.z,
      });
    }
  };
}

class OtherPlayersNetworkManager extends System {
  io: ClientChannel;

  gameNetworkManager: GameNetworkManager;

  gameSpace: Space;

  gameScene: Scene;

  constructor({
    gameNetworkManager,
    space,
    scene,
    io,
  }: {
    gameNetworkManager: GameNetworkManager;
    space: Space;
    scene: Scene;
    io: ClientChannel;
  }) {
    super();
    this.gameNetworkManager = gameNetworkManager;
    this.gameSpace = space;
    this.gameScene = scene;
    this.io = io;
  }

  onInit = (): void => {
    this.io.on('frame', (d) => {
      const data = d as {
        players: {
          [id: string]: { id: string; x: number; y: number; z: number };
        };
      };

      Object.values(data.players).map((box) => {
        // get the box id
        const { id } = box;

        // skip if the box is the current player
        if (this.gameNetworkManager.playerId === id) {
          return;
        }

        // create or retrieve the entity
        let entity: Entity | undefined = this.gameSpace.entities.get(id);
        if (entity === undefined) {
          entity = this.gameSpace.create.entity({ id });
          entity.addComponent(new PlayerMesh({ gameScene: this.gameScene }));
          this.gameSpace.add(entity);
        }

        // set the entities position
        const playerMesh = entity.get(PlayerMesh) as PlayerMesh;

        playerMesh.cube.position.set(box.x, box.y, box.z);
      });
    });
  };
}

class GameNetworkManager extends System {
  playerId: string | undefined;

  io: ClientChannel | undefined;

  gameSpace: Space;

  gameScene: Scene;

  constructor({
    gameSpace,
    gameScene,
  }: {
    gameSpace: Space;
    gameScene: Scene;
  }) {
    super();
    this.gameSpace = gameSpace;
    this.gameScene = gameScene;
  }

  onInit = (): void => {
    this.io = geckos({
      port: 9208,
    });

    this.io.onConnect((error) => {
      if (error) {
        console.error(error);
        return;
      }

      this.io?.on('join-response', (d) => {
        const data = d as {
          id: string;
          position: { x: number; y: number; z: number };
        };

        this.playerId = data.id;

        this.gameSpace.create.entity({
          id: data.id,
          components: [
            new PlayerMesh({ gameScene: this.gameScene }),
            new PlayerControls(),
            new PlayerNetworkManager({
              playerId: data.id,
              io: this.io as ClientChannel,
            }),
          ],
        });

        this.world.add.system(
          new OtherPlayersNetworkManager({
            space: this.gameSpace,
            scene: this.gameScene,
            io: this.io as ClientChannel,
            gameNetworkManager: this,
          })
        );
      });

      this.io?.emit('join-request');
    });
  };
}

const App = () => {
  const firstRender = useFirstRender();

  useEffect(() => {
    const engine = new Engine({
      debug: true,
    });

    const worldProvider: WorldProvider = (worldContext) => {
      const world = new World({ engine: worldContext.engine });

      const renderer = world.create.renderer.webgl({
        domElementId: 'renderer-root',
      });

      const camera = world.create.camera();
      camera.position.set(0, 0, 500);

      const scene = world.create.scene();

      renderer.create.view({ scene, camera });

      const space = world.create.space();

      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(300, 0, 300);
      directionalLight.lookAt(new Vector3(0, 0, 0));
      scene.add(directionalLight);

      const ambientLight = new AmbientLight(0xffffff, 0.5);
      ambientLight.position.set(0, -200, 400);
      ambientLight.lookAt(new Vector3(0, 0, 0));
      scene.add(ambientLight);

      world.add.system(
        new GameNetworkManager({
          gameSpace: space,
          gameScene: scene,
        })
      );

      return world;
    };

    engine.run(worldProvider);
  }, [firstRender]);

  return <div id="renderer-root"></div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

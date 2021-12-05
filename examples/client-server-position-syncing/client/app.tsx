/* eslint-disable max-classes-per-file */
import {
  Component,
  Entity,
  logger,
  NetworkManager,
  Runtime,
  Scene,
  Space,
  System,
  World,
  WorldProvider,
} from '@rapidajs/rapida';
import * as React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as three from 'three';
import { SERVER_ENDPOINT, TESTING_ROOM_ID } from '../common';
import {
  PlayerPositionUpdateEvent,
  PLAYER_POSITION_UPDATE,
} from '../common/events/client-to-server';
import {
  OtherBoxesUpdateEvent,
  OTHER_BOXES_UPDATE_EVENT,
  PlayerInitEvent,
  PLAYER_INIT_EVENT,
} from '../common/events/server-to-client';
import { useFirstRender } from './hooks';

class PlayerMesh extends Component {
  gameScene: Scene;

  cube: three.Mesh;

  constructor({ gameScene }: { gameScene: Scene }) {
    super();
    this.gameScene = gameScene;
  }

  onInit = (): void => {
    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.cube = new three.Mesh(geometry, material);

    this.gameScene.add(this.cube);
  };

  onDestroy = (): void => {
    this.gameScene.remove(this.cube);
  };
}

class PlayerControls extends Component {
  playerMesh?: PlayerMesh;

  up: boolean;

  down: boolean;

  left: boolean;

  right: boolean;

  dirty = false;

  onInit = (): void => {
    this.playerMesh = this.entity.get(PlayerMesh);

    const W_KEY = 87;
    const S_KEY = 83;
    const A_KEY = 65;
    const D_KEY = 68;

    const onDocumentKeyDown = (event) => {
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

    const onDocumentKeyUp = (event) => {
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

    const { position } = this.playerMesh.cube;
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
      this.playerMesh.cube.position.copy(position);
    }
  };
}

class PlayerNetworkManager extends Component {
  playerId: string;

  playerMesh?: PlayerMesh;

  playerControls?: PlayerControls;

  networkManager: NetworkManager;

  constructor({
    playerId,
    networkManager,
  }: {
    playerId: string;
    networkManager: NetworkManager;
  }) {
    super();
    this.playerId = playerId;
    this.networkManager = networkManager;
  }

  onInit = (): void => {
    this.playerMesh = this.entity.get(PlayerMesh);
    this.playerControls = this.entity.get(PlayerControls);

    this.networkManager.on(
      PLAYER_POSITION_UPDATE,
      (event: PlayerPositionUpdateEvent) => {
        this.playerMesh.cube.position.set(
          event.data.position.x,
          event.data.position.y,
          event.data.position.z
        );
      }
    );
  };

  onUpdate = (timeElapsed: number) => {
    if (this.playerControls.dirty) {
      this.playerControls.dirty = false;
      this.networkManager.emit<PlayerPositionUpdateEvent>({
        topic: PLAYER_POSITION_UPDATE,
        data: {
          id: this.playerId,
          position: {
            x: this.playerMesh.cube.position.x,
            y: this.playerMesh.cube.position.y,
            z: this.playerMesh.cube.position.z,
          },
        },
      });
    }
  };
}

class OtherPlayersNetworkManager extends System {
  networkManager: NetworkManager;

  gameSpace: Space;

  gameScene: Scene;

  constructor({
    space,
    scene,
    networkManager,
  }: {
    space: Space;
    scene: Scene;
    networkManager: NetworkManager;
  }) {
    super();
    this.gameSpace = space;
    this.gameScene = scene;
    this.networkManager = networkManager;
  }

  onInit = (): void => {
    this.networkManager.on(
      OTHER_BOXES_UPDATE_EVENT,
      (event: OtherBoxesUpdateEvent) => {
        event.data.forEach((otherBox) => {
          // get the box id
          const { id } = otherBox;

          // skip if the box is the current player
          if (this.networkManager.clientId === id) {
            return;
          }

          // create or retrieve the entity
          let entity: Entity = this.gameSpace.entities.get(id);
          if (!entity) {
            logger.info(`creating missing player "${id}"`);
            entity = this.gameSpace.create.entity({ id });
            entity.addComponent(new PlayerMesh({ gameScene: this.gameScene }));
            this.gameSpace.add(entity);
          } else {
            entity = this.gameSpace.entities.get(id);
          }

          // set the entities position
          const playerMesh = entity.get(PlayerMesh);

          playerMesh.cube.position.set(
            otherBox.position.x,
            otherBox.position.y,
            otherBox.position.z
          );
        });
      }
    );
  };
}

class LightComponent extends Component {
  scene: Scene;

  lights: three.Group;

  constructor({ scene }: { scene: Scene }) {
    super();
    this.scene = scene;
  }

  onInit = (): void => {
    this.lights = new three.Group();

    const directionalLight = new three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(directionalLight);

    const ambientLight = new three.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(ambientLight);

    this.scene.add(this.lights);
  };

  onDestroy = (): void => {
    this.scene.remove(this.lights);
  };
}

class GameNetworkManager extends System {
  gameSpace: Space;

  gameScene: Scene;

  networkManager: NetworkManager;

  constructor({
    gameSpace,
    gameScene,
    networkManager,
  }: {
    gameSpace: Space;
    gameScene: Scene;
    networkManager: NetworkManager;
  }) {
    super();
    this.gameSpace = gameSpace;
    this.gameScene = gameScene;
    this.networkManager = networkManager;
  }

  onInit = (): void => {
    this.networkManager.on(PLAYER_INIT_EVENT, (event: PlayerInitEvent) => {
      const entity = this.gameSpace.create.entity({
        id: event.data.id,
        components: [
          new PlayerMesh({ gameScene: this.gameScene }),
          new PlayerControls(),
          new PlayerNetworkManager({
            playerId: event.data.id,
            networkManager: this.networkManager,
          }),
        ],
      });

      this.world.addSystem(
        new OtherPlayersNetworkManager({
          space: this.gameSpace,
          scene: this.gameScene,
          networkManager: this.networkManager,
        })
      );
    });

    this.networkManager.join(TESTING_ROOM_ID, SERVER_ENDPOINT);
  };

  onUpdate = () => {
    this.networkManager.tick();
  };
}

const App = () => {
  const firstRender = useFirstRender();

  useEffect(() => {
    const runtime = new Runtime({
      domId: 'renderer-root',
      debug: true,
    });

    logger.level = 'debug';

    const worldId = 'ExampleWorld';

    const worldProvider: WorldProvider = (worldContext) => {
      const world = new World({ id: worldId, runtime: worldContext.runtime });

      const networkManager = new NetworkManager();

      const camera = world.create.camera();
      camera.position.set(0, 0, 500);

      const scene = world.create.scene();

      world.create.view({ scene, camera });

      const space = world.create.space();

      const light = space.create.entity();
      light.addComponent(new LightComponent({ scene }));

      world.addSystem(
        new GameNetworkManager({
          gameSpace: space,
          gameScene: scene,
          networkManager,
        })
      );

      return world;
    };

    runtime.registerWorld(worldId, worldProvider);
    runtime.startWorld(worldId);
  }, [firstRender]);

  return <div id="renderer-root"></div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

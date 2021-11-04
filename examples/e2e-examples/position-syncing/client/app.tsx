/* eslint-disable max-classes-per-file */
import {
  Camera,
  Component,
  Entity,
  logger,
  NetworkManager,
  Runtime,
  Scene,
  SceneProvider,
  System,
} from '@isaacmason/rapida-client';
import * as three from 'three';
import * as React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

class PlayerControls extends Component {
  up: boolean;

  down: boolean;

  left: boolean;

  right: boolean;

  dirty = false;

  init = (): void => {
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

  update = (timeElapsed: number) => {
    const scalar = 0.1;
    let dirty = false;

    const { position } = this.entity;
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
      this.entity.position = position;
    }
  };
}

class PlayerMesh extends Component {
  cube: three.Mesh;

  init = (): void => {
    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.cube = new three.Mesh(geometry, material);

    this.entity.group.add(this.cube);
  };

  destroy = (): void => {
    this.entity.group.remove(this.cube);
  };
}

class PlayerNetworkManager extends Component {
  playerId: string;

  constructor(name: string, playerId: string) {
    super(name);
    this.playerId = playerId;
  }

  init = (): void => {
    this.networkManager.on(
      PLAYER_POSITION_UPDATE,
      (event: PlayerPositionUpdateEvent) => {
        this.entity.position = event.data.position;
      }
    );
  };

  update = (timeElapsed: number) => {
    const playerControls = this.entity.getComponent(PlayerControls);
    if (playerControls.dirty) {
      playerControls.dirty = false;
      this.networkManager.emit<PlayerPositionUpdateEvent>({
        topic: PLAYER_POSITION_UPDATE,
        data: {
          id: this.playerId,
          position: {
            x: this.entity.position.x,
            y: this.entity.position.y,
            z: this.entity.position.z,
          },
        },
      });
    }
  };
}

class OtherPlayersNetworkManager extends System {
  onSystemInit = (): void => {
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
          let entity: Entity;
          if (this.scene.entities[id] === undefined) {
            logger.debug(`creating missing player "${id}"`);
            entity = new Entity(id);
            entity.addComponent(new PlayerMesh('mesh'));
            this.scene.add(entity);
          } else {
            entity = this.scene.entities[id];
          }

          // set the entities position
          entity.position = otherBox.position;
        });
      }
    );
  };
}

class LightComponent extends Component {
  lights: three.Group;

  init = (): void => {
    this.lights = new three.Group();

    const directionalLight = new three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(directionalLight);

    const ambientLight = new three.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(ambientLight);

    this.entity.group.add(this.lights);
  };

  destroy = (): void => {
    this.entity.group.remove(this.lights);
  };
}

class GameNetworkManager extends System {
  onSystemInit = (): void => {
    this.networkManager.on(PLAYER_INIT_EVENT, (event: PlayerInitEvent) => {
      const player = new Entity('player');
      player.addComponent(new PlayerMesh('mesh'));
      player.addComponent(new PlayerControls('controls'));
      player.addComponent(
        new PlayerNetworkManager('network-manager', event.data.id)
      );

      this.scene.add(player);

      this.scene.add(
        new OtherPlayersNetworkManager('other-players-network-manager')
      );
    });
  };
}

const App = () => {
  const firstRender = useFirstRender();

  useEffect(() => {
    const networkManager = new NetworkManager();

    const runtime = new Runtime({
      domId: 'renderer-root',
      debug: false,
      networkManager,
    });

    const sceneId = 'ExampleScene';

    const sceneProvider: SceneProvider = (sceneContext) => {
      const scene = new Scene(sceneId, {
        runtime: sceneContext.runtime,
        networkManager: sceneContext.networkManager,
      });

      const camera = new Camera('camera');
      camera.position.set(0, 0, 500);
      scene.add(camera);

      const light = new Entity('light');
      light.addComponent(new LightComponent('light'));
      scene.add(light);

      scene.add(new GameNetworkManager('network-manager'));

      return scene;
    };

    runtime.registerScene(sceneId, sceneProvider);
    runtime.setScene(sceneId);

    networkManager.join(TESTING_ROOM_ID, SERVER_ENDPOINT);
  }, [firstRender]);

  return <div id="renderer-root"></div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

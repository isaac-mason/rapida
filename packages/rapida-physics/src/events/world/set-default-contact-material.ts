import { ContactMaterial } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetDefaultContactMaterialEvent = {
  topic: PhysicsEventTopic.SET_DEFAULT_CONTACT_MATERIAL;
  params: Partial<ContactMaterial>;
};

export const handleSetDefaultContactMaterial = (e: SetDefaultContactMaterialEvent, state: State): void => {
  const { params } = e;
  state.world.defaultContactMaterial = params as ContactMaterial;
};

import bodyHandlers from './managers/body-manager';
import constraintHandlers from './managers/constraint-manager';
import subscriptionHandlers from './managers/subscription-manager';
import springHandlers from './managers/spring-manager';
import worldHandlers from './managers/world-manager';

const eventHandlers = {
  ...bodyHandlers,
  ...constraintHandlers,
  ...worldHandlers,
  ...springHandlers,
  ...subscriptionHandlers,
};

export type EventTopicName = keyof typeof eventHandlers;

export default eventHandlers;

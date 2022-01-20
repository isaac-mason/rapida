import { SubscriptionName, AtomicName, AtomicProps, VectorName } from './body';
import { Triplet } from './vec';

export type PropValue<T extends SubscriptionName = SubscriptionName> = T extends AtomicName
  ? AtomicProps[T]
  : T extends VectorName
  ? Triplet
  : T extends 'sliding'
  ? boolean
  : never;

export type Subscription = Partial<{ [K in SubscriptionName]: (value: PropValue<K>) => void }>;

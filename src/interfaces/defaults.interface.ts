import { Property } from './property.type';

export interface IDefaults<T, TValue> {
  get(target: T, event: Property): TValue;
  set(target: T, property: Property, value: TValue): boolean;
  unwrapDefaults(target: T): T;
}

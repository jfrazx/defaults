import { Property } from './property.type';

export type Criteria<T extends object = {}, TValue = any> = (
  value: TValue,
  property: Property,
  target: T
) => boolean;

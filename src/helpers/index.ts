import { DefaultsEvent } from '../enums';

export const isUnwrapDefaults = (value: unknown): boolean =>
  value === DefaultsEvent.Unwrap;

export const isObjectOrArray = (value: unknown): boolean =>
  isObject(value) || Array.isArray(value);

export const isObject = (value: unknown): value is object =>
  Boolean(value) && Array.isArray(value) === false && typeof value === 'object';

export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

export const isFunction = (value: unknown): value is Function => {
  return typeof value === 'function';
};

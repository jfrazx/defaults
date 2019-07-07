import { isObject } from './is-object';

export function isObjectOrArray(value: any): boolean {
  return isObject(value) || Array.isArray(value);
}

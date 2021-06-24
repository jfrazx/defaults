import { Methods } from '../enums';

export const isUnwrapDefaults = (value: unknown): boolean => value === Methods.Unwrap;

export const isObjectOrArray = (value: unknown): boolean =>
  isObject(value) || Array.isArray(value);

export const isObject = (value: unknown): value is object =>
  Boolean(value) && Array.isArray(value) === false && is(value, 'object');

export const isUndefined = (value: unknown): value is undefined => is(value, 'undefined');
export const isFunction = (value: unknown): value is Function => is(value, 'function');
export const isBoolean = (value: unknown): value is boolean => is(value, 'boolean');
export const isNumber = (value: unknown): value is number => is(value, 'number');
export const isString = (value: unknown): value is string => is(value, 'string');
export const isSymbol = (value: unknown): value is symbol => is(value, 'symbol');
export const isNull = (value: unknown): value is undefined => is(value, 'null');
export const isUndefinedOrNull = (value: unknown): value is undefined | null =>
  isNull(value) || isUndefined(value);

const is = (value: unknown, type: string) => typeof value === type;

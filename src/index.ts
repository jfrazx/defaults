import type { DefaultOptions } from './interfaces';
import { DefaultsFactory } from './factory';

export function wrapDefaults<T extends object = Record<string, any>, TValue = any>(
  defaultOptions: DefaultOptions<T, TValue> = {},
) {
  return DefaultsFactory.for(defaultOptions);
}

export type { Default, Criteria, DefaultOptions, IgnoreCriteria } from './interfaces';

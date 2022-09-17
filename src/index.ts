import type { DefaultOptions } from './interfaces';
import { DefaultsFactory } from './factory';

export const wrapDefaults = <T extends object = {}, TValue = any>(
  defaultOptions: DefaultOptions<T, TValue> = {},
) => DefaultsFactory.for(defaultOptions);

export { Default, Criteria, DefaultOptions, IgnoreCriteria } from './interfaces';

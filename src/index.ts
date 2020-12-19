import { DefaultOptions, Default } from './interfaces';
import { defaultsFactory } from './defaults';

/**
 * @param defaultOptions
 */
export const wrapDefaults = <T extends object = {}, TValue = any>(
  defaultOptions: DefaultOptions<T, TValue> = Object.create(null)
): Default<T> => {
  return defaultsFactory(defaultOptions);
};

export * from './defaults';
export { Default, Criteria, DefaultOptions, IgnoreCriteria } from './interfaces';

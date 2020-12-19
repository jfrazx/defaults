import { DefaultOptions, Default } from './interfaces';
import { Defaults } from './defaults';

export const wrapDefaults = <T extends object = {}, TValue = any>(
  defaultOptions: DefaultOptions<T, TValue> = Object.create(null)
): Default<T> => {
  return Defaults.wrap(defaultOptions);
};

export * from './defaults';
export { Default, Criteria, DefaultOptions, IgnoreCriteria } from './interfaces';

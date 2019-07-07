import { DefaultOptions } from './interfaces';
import { Defaults } from './defaults';

export function wrapDefaults<T extends object = {}, TValue = any>(
  defaultOptions: DefaultOptions<T, TValue> = {}
) {
  return Defaults.wrap(defaultOptions);
}

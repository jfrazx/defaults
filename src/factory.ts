import { DefaultOptions, Default, IDefaults } from './interfaces';
import { DefaultsArrayComplex } from './defaults-array-complex';
import { DefaultsComplex } from './defaults-complex';
import { DefaultsArray } from './defaults-array';
import { isObjectOrArray } from './helpers';
import { Defaults } from './defaults';

export function defaultsFactory<T extends object, TValue>(
  options: DefaultOptions<T, TValue>
): Default<T> {
  const { wrap = {}, defaultValue } = options;
  let handler: IDefaults<T, TValue>;

  switch (true) {
    case Array.isArray(wrap) && Array.isArray(defaultValue):
      handler = new DefaultsArrayComplex(options);
      break;
    case Array.isArray(wrap):
      handler = new DefaultsArray(options);
      break;
    case isObjectOrArray(defaultValue):
      handler = new DefaultsComplex(options);
      break;
    default:
      handler = new Defaults(options);
  }

  return new Proxy(wrap, handler) as Default<T>;
}

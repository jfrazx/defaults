import { DefaultOptions, Default, IDefaults } from '../interfaces';
import { DefaultsArrayComplex } from './defaults-array-complex';
import { DefaultsComplex } from './defaults-complex';
import { DefaultsArray } from './defaults-array';
import { Defaults } from './defaults';

interface DefaultsConstructor<T extends object, TValue> {
  condition(options: DefaultOptions<T, TValue>): boolean;
  new (options: DefaultOptions<T, TValue>): IDefaults<T, TValue>;
}

export const defaultsFactory = <T extends object, TValue>(
  options: DefaultOptions<T, TValue>
): Default<T> => {
  const { wrap = Object.create(null) } = options;
  const handler = getHandler(options);

  return new Proxy(wrap, handler) as Default<T>;
};

const getHandler = <T extends object, TValue>(
  options: DefaultOptions<T, TValue>
): IDefaults<T, TValue> => {
  const defaults: DefaultsConstructor<T, TValue>[] = [
    DefaultsArrayComplex,
    DefaultsArray,
    DefaultsComplex,
    Defaults,
  ];
  const DefaultHandler = defaults.find(({ condition }) => condition(options))!;

  return new DefaultHandler(options);
};

export { Defaults } from './defaults';

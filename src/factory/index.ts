import { DefaultOptions, Default } from '../interfaces';
import { rules } from './rules';

export abstract class DefaultsFactory {
  static for<T extends object, TValue>({
    wrap,
    ...options
  }: DefaultOptions<T, TValue>): Default<T> {
    const { defaultValue } = options;
    const useWrap = wrap || {};

    const handler = rules
      .map((Rule) => new Rule(useWrap, defaultValue, options))
      .find((rule) => rule.shouldHandle())!
      .handle();

    return new Proxy(useWrap, handler) as Default<T>;
  }
}

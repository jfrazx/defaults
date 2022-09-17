import type { DefaultOptions, Default, IDefaults, IDefaultOptions } from '../interfaces';
import { ValueHandlerRuleRunner } from '../rules';
import { OptionsContainer } from '../options';
import { getDefaultsRules } from '../rules';

export abstract class DefaultsFactory {
  static for<T extends object, TValue>({
    wrap,
    ...options
  }: DefaultOptions<T, TValue>): Default<T> {
    const optionsContainer = new OptionsContainer<T, TValue>(
      options as IDefaultOptions<T, TValue>,
    );
    const useWrap = wrap || (Object.create(null) as T);
    const { defaultValue } = options;

    const valueHandler = ValueHandlerRuleRunner.for<T, TValue>(
      useWrap,
      defaultValue as TValue,
      optionsContainer,
    );

    const handler: IDefaults<T, TValue> = getDefaultsRules<T, TValue>()
      .map((Rule) => new Rule(useWrap, optionsContainer, valueHandler))
      .find((rule) => rule.shouldHandle())!
      .handle();

    return new Proxy(useWrap, handler) as Default<T>;
  }
}

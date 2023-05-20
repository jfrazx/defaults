import type { DefaultOptions, Default, IDefaults, IDefaultOptions } from '../interfaces';
import type { DefaultRuleConstruct, ShouldHandle } from '../rules/interfaces';
import { ValueHandlerRuleRunner, getDefaultsRules } from '../rules';
import { OptionsContainer } from '../options';

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
      .map(
        (Rule: DefaultRuleConstruct<T, TValue>) =>
          new Rule(useWrap, optionsContainer, valueHandler),
      )
      .find((rule: ShouldHandle<IDefaults<T, TValue>>) => rule.shouldHandle())!
      .handle();

    return new Proxy(useWrap, handler) as Default<T>;
  }
}

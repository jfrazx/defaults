import type { DefaultRuleConstruct, ShouldHandle } from '../rules/interfaces';
import { ValueHandlerRuleRunner, getDefaultsRules } from '../rules';
import { OptionsContainer } from '../options';
import type {
  Default,
  IDefaults,
  IValueHandler,
  DefaultOptions,
  IDefaultOptions,
} from '../interfaces';

export abstract class DefaultsFactory {
  static for<T extends object, TValue>({
    wrap,
    ...options
  }: DefaultOptions<T, TValue>): Default<T> {
    const optionsContainer: OptionsContainer<T, TValue> = new OptionsContainer<T, TValue>(
      options as IDefaultOptions<T, TValue>,
    );
    const target: T = wrap || (Object.create(null) as T);

    const valueHandler: IValueHandler<TValue> = ValueHandlerRuleRunner.for<T, TValue>(
      target,
      options.defaultValue as TValue,
      optionsContainer,
    );

    const handler: IDefaults<T, TValue> = getDefaultsRules<T, TValue>()
      .map(
        (Rule: DefaultRuleConstruct<T, TValue>) => new Rule(target, optionsContainer, valueHandler),
      )
      .find((rule: ShouldHandle<IDefaults<T, TValue>>) => rule.shouldHandle())!
      .handle();

    return new Proxy(target, handler) as Default<T>;
  }
}

import type { OptionsContainer } from '../../options';
import type { IValueHandler } from '../../interfaces';
import { getValueHandlerRules } from './rules';

export abstract class ValueHandlerRuleRunner {
  static for<T extends object, TValue>(
    target: T,
    value: TValue,
    options: OptionsContainer<T, TValue>,
  ): IValueHandler<TValue> {
    return getValueHandlerRules<T, TValue>()
      .map((Rule) => new Rule(target, value, options))
      .find((rule) => rule.shouldHandle())!
      .handle();
  }
}

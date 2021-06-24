import { ValueHandlerRuleRunner } from '../../../rules';
import { ValueHandler } from '../base';

export class SetValueHandler<T extends object, TValue> extends ValueHandler<
  T,
  Set<TValue>
> {
  supplyDefault(value: Set<TValue> = this.value) {
    const set = new Set<TValue>();

    value.forEach((value) => {
      const handler = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      );

      set.add(handler.supplyDefault());
    });

    return set;
  }
}

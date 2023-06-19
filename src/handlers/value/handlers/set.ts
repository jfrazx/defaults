import { ValueHandlerRuleRunner } from '../../../rules';
import type { Property } from '../../../interfaces';
import { ValueHandler } from '../base';

export class SetValueHandler<T extends object, TValue> extends ValueHandler<
  T,
  Set<TValue>
> {
  supplyDefault(event: Property) {
    const set = new Set<TValue>();

    this.value.forEach((value: TValue) => {
      const handler = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      );

      set.add(handler.supplyDefault(event));
    });

    return set;
  }
}

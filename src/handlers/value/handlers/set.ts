import type { IValueHandler, Property } from '../../../interfaces';
import { ValueHandlerRuleRunner } from '../../../rules';
import { ValueHandler } from '../base';

export class SetValueHandler<T extends object, TValue> extends ValueHandler<T, Set<TValue>> {
  supplyDefault(event: Property) {
    const set: Set<TValue> = new Set<TValue>();

    this.value.forEach((value: TValue) => {
      const handler: IValueHandler<TValue> = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      );

      set.add(handler.supplyDefault(event));
    });

    return set;
  }
}

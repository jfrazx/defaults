import { ValueHandlerRuleRunner } from '../../../rules';
import { ValueHandler } from '../base';

export class MapValueHandler<T extends object, TValue> extends ValueHandler<
  T,
  Map<T, TValue>
> {
  supplyDefault(values: Map<T, TValue> = this.value) {
    const { reuseMapKey } = this.options;
    const map = new Map<T, TValue>();

    for (const [key, value] of values.entries()) {
      const valueHandler = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      );
      const updatedValue = valueHandler.supplyDefault();

      const updatedKey = reuseMapKey
        ? key
        : ValueHandlerRuleRunner.for<T, any>(
            this.target,
            key,
            this.options,
          ).supplyDefault();

      map.set(updatedKey, updatedValue);
    }

    return map;
  }
}

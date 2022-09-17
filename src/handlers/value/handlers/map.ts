import { ValueHandlerRuleRunner } from '../../../rules';
import { ValueHandler } from '../base';

/**
 * @description Map value handler operators on
 *
 * @export
 * @class MapValueHandler
 * @extends {ValueHandler<T, Map<T, TValue>>}
 * @template T
 * @template TValue
 */
export class MapValueHandler<T extends object, TValue> extends ValueHandler<
  T,
  Map<T, TValue>
> {
  supplyDefault() {
    const { reuseMapKey } = this.options;
    const map = new Map<T, TValue>();

    for (const [key, value] of this.value.entries()) {
      const updatedValue = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      ).supplyDefault();

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

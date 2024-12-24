import { ValueHandlerRuleRunner } from '../../../rules';
import type { Property } from '../../../interfaces';
import { ValueHandler } from '../base';

/**
 * @description Map value handler for managing map content
 *
 * @export
 * @class MapValueHandler
 * @extends {ValueHandler<T, Map<T, TValue>>}
 * @template T
 * @template TValue
 */
export class MapValueHandler<T extends object, TValue> extends ValueHandler<T, Map<T, TValue>> {
  supplyDefault(event: Property) {
    const map: Map<T, TValue> = new Map<T, TValue>();

    for (const [key, value] of this.value.entries()) {
      const updatedValue: TValue = ValueHandlerRuleRunner.for<T, any>(
        this.target,
        value,
        this.options,
      ).supplyDefault(event);

      const updatedKey = this.retrieveMapKey(key, event);
      map.set(updatedKey, updatedValue);
    }

    return map;
  }

  private retrieveMapKey(key: T, event: Property): T {
    return this.options.reuseMapKey
      ? key
      : ValueHandlerRuleRunner.for<T, any>(this.target, key, this.options).supplyDefault(event);
  }
}

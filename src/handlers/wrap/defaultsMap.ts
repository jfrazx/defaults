import type { TargetReceiver } from './interfaces';
import type { Property } from '../../interfaces';
import { DefaultsArray } from './defaultsArray';

/**
 * @description Handler for wrapped Maps
 *
 * @export
 * @class DefaultsMap
 * @extends {DefaultsArray<Map<T, TValue>, TValue>}
 * @template T
 * @template TValue
 */
export class DefaultsMap<T extends object, TValue = any> extends DefaultsArray<Map<T, TValue>, TValue> {
  protected getTarget({ target }: TargetReceiver<Map<T, TValue>>): Map<T, TValue> {
    return target;
  }

  protected supplyDefaultAndSet(target: Map<T, TValue>, event: Property, [key]: any[]): TValue {
    const value: TValue = this.value.supplyDefault(event);

    if (this.shouldSetUndefined(true)) {
      target.set(key, value);
    }

    return value;
  }
}

import type { TargetReceiver } from './interfaces';
import { DefaultsArray } from './defaultsArray';

/**
 * @description
 *
 * @note Sets are not really value retrieving objects. Support is enabled to ensure they function normally if received by defaults
 *
 * @export
 * @class DefaultsSet
 * @extends {DefaultsMap<Set<T, TValue>, TValue>}
 * @template T
 * @template TValue
 */
export class DefaultsSet<TValue = any> extends DefaultsArray<Set<TValue>, TValue> {
  protected supplyDefaultAndSet() {
    return this.value.supplyDefault();
  }

  protected getTarget({ target }: TargetReceiver<Set<TValue>>): Set<TValue> {
    return target;
  }
}

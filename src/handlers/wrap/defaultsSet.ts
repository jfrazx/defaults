import type { TargetReceiver } from './interfaces';
import type { Property } from '../../interfaces';
import { DefaultsArray } from './defaultsArray';
import { isUndefined } from '../../helpers';

/**
 * @note Sets are not really value retrieving objects. Support is enabled to ensure they function normally if received by defaults
 *
 * @export
 * @class DefaultsSet
 * @extends {DefaultsArray<Set<TValue>, TValue>}
 * @template TValue
 */
export class DefaultsSet<TValue = any> extends DefaultsArray<Set<TValue>, TValue> {
  get(target: Set<TValue>, event: Property, receiver?: Set<TValue>): TValue {
    if (event === 'size') {
      return Reflect.get(receiver!, event, target) as TValue;
    }

    if (event === 'add') {
      return this.handleAdd.bind(this, target, event) as TValue;
    }

    return super.get(target, event, receiver!);
  }

  private handleAdd(target: Set<TValue>, event: Property, value: TValue): TValue {
    const shouldUseDefault =
      isUndefined(value) || this.options.setCriteria.call(target, value, event, target);
    const useValue = shouldUseDefault ? this.value.supplyDefault(event) : value;
    return target.add(useValue) as TValue;
  }

  protected getTarget({ target }: TargetReceiver<Set<TValue>>): Set<TValue> {
    return target;
  }
}

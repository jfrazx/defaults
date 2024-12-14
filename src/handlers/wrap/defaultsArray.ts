import { isFunction, isUndefined } from '../../helpers';
import type { TargetReceiver } from './interfaces';
import type { Property } from '../../interfaces';
import { Defaults } from './defaults';

/**
 * @description Handler for wrapped arrays
 *
 * @export
 * @class DefaultsArray
 * @extends {Defaults<T, TValue>}
 * @template T
 * @template TValue
 */
export class DefaultsArray<T extends object, TValue = any> extends Defaults<T, TValue> {
  get(target: T, event: Property, receiver?: T): TValue {
    const intendedTarget: T = this.getTarget({ target, receiver: receiver! });
    const original: unknown = Reflect.get(target, event, receiver);

    return isFunction(original)
      ? (this.handle.bind(this, intendedTarget, event, original) as TValue)
      : super.get(target, event, receiver!);
  }

  protected getTarget({ receiver }: TargetReceiver<T>): T {
    return receiver!;
  }

  protected handle(
    target: T,
    event: Property,
    original: Function,
    ...args: unknown[]
  ): TValue {
    const result: unknown = original.apply(target, args);

    return isUndefined(result)
      ? this.supplyDefaultAndSet(target, event, args)
      : (result as TValue);
  }

  protected supplyDefaultAndSet(_target: T, event: Property, _args: any[]): TValue {
    return this.value.supplyDefault(event);
  }
}

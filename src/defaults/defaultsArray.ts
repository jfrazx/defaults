import { isFunction, isUndefined } from '../helpers';
import { TargetReceiver } from './interfaces';
import { Property } from '../interfaces';
import { Defaults } from './defaults';

export class DefaultsArray<T extends object, TValue = any> extends Defaults<T, TValue> {
  get(target: T, event: Property, receiver?: T): TValue {
    const intendedTarget = this.getTarget({ target, receiver });
    const original = Reflect.get(target, event, receiver);

    return isFunction(original)
      ? (this.handle.bind(this, intendedTarget, original) as any)
      : super.get(target, event);
  }

  protected getTarget({ receiver }: TargetReceiver<T>): T {
    return receiver!;
  }

  protected handle(target: T, original: Function, ...args: unknown[]): TValue {
    const result: any = original.apply(target, args);

    return isUndefined(result) ? this.supplyDefaultAndSet(target, args) : result;
  }

  protected supplyDefaultAndSet(target: T, args: any[]) {
    const value = this.value.supplyDefault();

    this.setValue(target, args, value);

    return value;
  }

  protected setValue(_target: T, _args: any[], _value: TValue) {}
}

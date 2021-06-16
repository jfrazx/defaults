import { isFunction, isUndefined } from '../helpers';
import { Property } from '../interfaces';
import { Defaults } from './defaults';
import { Methods } from '../enums';

export class DefaultsArray<T extends object, TValue = any> extends Defaults<T, TValue> {
  get(target: T, event: Property, receiver?: T): TValue {
    const original = Reflect.get(target, event);
    if (!this.isShiftPop(event) || !isFunction(original)) {
      return super.get(target, event);
    }

    return this.handle.bind(this, receiver, original) as any;
  }

  private handle(target: T, original: Function, ...args: unknown[]): TValue {
    const result: any = original.apply(target, args);

    return isUndefined(result) ? this.supplyDefault() : result;
  }

  private isShiftPop(event: Property) {
    return [Methods.Pop, Methods.Shift].some((value: string) => value === event);
  }
}

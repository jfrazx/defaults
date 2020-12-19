import { DefaultOptions, Property } from '../interfaces';
import { isFunction, isUndefined } from '../helpers';
import { Defaults } from './defaults';

export class DefaultsArray<T extends object = {}, TValue = any> extends Defaults<
  T,
  TValue
> {
  static condition<T extends object, TValue>({
    wrap,
  }: DefaultOptions<T, TValue>): boolean {
    return Array.isArray(wrap);
  }

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
    return event === 'pop' || event === 'shift';
  }
}
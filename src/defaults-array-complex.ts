import { DefaultsComplex } from './defaults-complex';
import { isFunction, isUndefined } from './helpers';
import { Property } from './interfaces';

export class DefaultsArrayComplex<
  T extends object = {},
  TValue = unknown
> extends DefaultsComplex<T, TValue> {
  get(target: T, event: Property, receiver?: T): TValue {
    const original = Reflect.get(target, event);
    if (!this.isFunctionOrShiftPop(original, event)) {
      return super.get(target, event);
    }

    return (this.handle.bind(this, receiver, original) as unknown) as TValue;
  }

  private handle(target: T, original: Function, ...args: unknown[]): TValue {
    const result: any = original.apply(target, args);

    return isUndefined(result) ? this.supplyDefault() : result;
  }

  private isFunctionOrShiftPop(original: unknown, event: Property): boolean {
    return isFunction(original) || this.isShiftPop(event);
  }

  private isShiftPop(event: Property): boolean {
    return event === 'pop' || event === 'shift';
  }
}

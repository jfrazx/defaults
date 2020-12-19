import { isObject, isObjectOrArray } from '../helpers';
import { DefaultOptions } from '../interfaces/';
import { Defaults } from './defaults';

export class DefaultsComplex<T extends object, TValue = unknown> extends Defaults<
  T,
  TValue
> {
  static condition<T extends object, TValue>({
    defaultValue,
  }: DefaultOptions<T, TValue>): boolean {
    return isObjectOrArray(defaultValue);
  }

  private arrayClone(array: any): TValue {
    return this.shallowCopy
      ? (([...array] as unknown) as TValue)
      : this.reduceArray(array);
  }

  private objectClone(object: TValue): TValue {
    return this.shallowCopy
      ? { ...object }
      : Object.assign(
          Object.create(Object.getPrototypeOf(object)),
          this.reduceObject(object)
        );
  }

  private reduceArray(array: TValue): TValue {
    return (array as any).map((value: TValue) =>
      this.supplyDefault(value)
    ) as TValue;
  }

  private reduceObject(object: TValue): TValue {
    return [
      ...Object.entries(object),
      ...Object.getOwnPropertySymbols(object).map((symbol) => [
        symbol,
        (<any>object)[symbol],
      ]),
    ].reduce((obj, [key, value]) => {
      return {
        ...obj,
        [key]: this.supplyDefault(value),
      };
    }, {}) as TValue;
  }

  protected supplyDefault(_default = this.defaultValue): TValue {
    if (Array.isArray(_default)) {
      return this.arrayClone(_default);
    } else if (isObject(_default)) {
      return this.objectClone(_default);
    }

    return _default;
  }
}

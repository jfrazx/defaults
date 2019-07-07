import { Defaults } from './defaults';
import { isObject } from './helpers';

export class DefaultsComplex<
  T extends object = {},
  TValue = any
> extends Defaults<T, TValue> {
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
      ...Object.getOwnPropertySymbols(object).map(symbol => [
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

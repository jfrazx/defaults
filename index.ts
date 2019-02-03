const criteria: Criteria = () => false;

export class Defaults<T extends object = {}, TValue = any>
  implements ProxyHandler<T> {
  private readonly defaultValue: TValue;
  private readonly setCriteria: Criteria<T, TValue>;
  private readonly setUndefined: boolean;
  private readonly shallowCopy: boolean;

  constructor({
    defaultValue = undefined,
    setCriteria = criteria,
    setUndefined = false,
    shallowCopy = true,
  }: DefaultOptions<T, TValue> = {}) {
    this.setCriteria = setCriteria;
    this.setUndefined = setUndefined;
    this.shallowCopy = shallowCopy;
    this.defaultValue = this.supplyDefault(defaultValue);
  }

  static wrap<T extends object = {}, TValue = any>(
    defaultOptions: DefaultOptions<T, TValue> = {}
  ) {
    const { wrap = {} } = defaultOptions;
    return new Proxy(wrap, new Defaults<T, TValue>(defaultOptions));
  }

  get(target: T, event: Property): TValue {
    const { useDefault, useValue } = this.useValue(target, event);
    return useDefault ? this.supplyDefault() : useValue;
  }

  set(target: T, property: Property, value: TValue) {
    const { criteria, setValue } = this.useCriteria(value);
    const useValue = criteria.call(target, setValue, property, target)
      ? this.supplyDefault()
      : setValue;

    return Reflect.set(target, property, useValue);
  }

  private useValue(target: T, event: Property) {
    const value = Reflect.get(target, event);
    const isUndefined = value === undefined;
    const didSet = this.setIfNeeded(target, event, isUndefined);
    const useDefault = isUndefined && !didSet;

    return {
      useDefault,
      useValue: didSet ? Reflect.get(target, event) : value,
    };
  }

  private setIfNeeded(target: T, event: Property, isUndef: boolean): boolean {
    if (this.shouldSetUndefined(isUndef)) {
      return Reflect.set(target, event, this.supplyDefault());
    }

    return false;
  }

  private shouldSetUndefined(isUndef: boolean): boolean {
    return this.setUndefined && isUndef;
  }

  private useCriteria(value: TValue | IgnoreCriteria<TValue>) {
    let setValue = value as TValue;
    let ignore = false;

    if (this.shouldIgnore(value)) {
      setValue = value.value;
      ignore = value.ignoreDefaultCriteria;
    }

    return { criteria: ignore ? criteria : this.setCriteria, setValue };
  }

  private shouldIgnore(value: any): value is IgnoreCriteria {
    return (
      this.isObject(value) &&
      (value as IgnoreCriteria).ignoreDefaultCriteria !== undefined
    );
  }

  private supplyDefault(_default = this.defaultValue): TValue {
    if (Array.isArray(_default)) {
      return this.arrayClone(_default);
    } else if (this.isObject(_default)) {
      return this.objectClone(_default);
    }

    return _default;
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

  private isObject(value: any): value is object {
    return value && Array.isArray(value) === false && typeof value === 'object';
  }
}

export interface IgnoreCriteria<TValue = any> {
  ignoreDefaultCriteria: boolean;
  value: TValue;
}

export interface DefaultOptions<T extends object = {}, TValue = any> {
  setCriteria?: Criteria<T, TValue>;
  wrap?: T;
  defaultValue?: TValue;
  setUndefined?: boolean;
  shallowCopy?: boolean;
}

export type Criteria<T extends object = {}, TValue = any> = (
  value: TValue,
  property: Property,
  target: T
) => boolean;

type Property = string | number | symbol;

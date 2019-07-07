import { isUndefined, isUnwrapDefaults, isObject } from './helpers';

import { criteria } from './criteria';
import {
  Default,
  Criteria,
  Property,
  DefaultOptions,
  IgnoreCriteria,
  IDefaults,
} from './interfaces';

export class Defaults<T extends object = {}, TValue = any>
  implements ProxyHandler<T>, IDefaults<T, TValue> {
  protected readonly defaultValue: TValue;
  protected readonly setCriteria: Criteria<T, TValue>;
  protected readonly setUndefined: boolean;
  protected readonly shallowCopy: boolean;

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
  ): Default<T> {
    return defaultsFactory(defaultOptions);
  }

  unwrapDefaults(target: T): T {
    return target;
  }

  get(target: T, event: Property): TValue {
    if (isUnwrapDefaults(event)) {
      return this.unwrapDefaults.bind(this, target) as any;
    }

    const { useDefault, useValue } = this.useValue(target, event);
    return useDefault ? this.supplyDefault() : useValue;
  }

  set(target: T, property: Property, value: TValue) {
    const { criteria, setValue } = this.determineCriteria(
      target,
      property,
      value
    );

    const useValue = criteria.call(target, setValue, property, target)
      ? this.supplyDefault()
      : setValue;
    return Reflect.set(target, property, useValue);
  }

  protected determineCriteria(target: T, property: Property, value: TValue) {
    const { criteria: setCriteria, setValue } = this.useCriteria(value);
    const isProtoProp = this.isPrototypeProperty(target, property);

    return {
      criteria: isProtoProp ? criteria : setCriteria,
      setValue,
    };
  }

  protected isPrototypeProperty(target: T, event: Property): boolean {
    return Object.getPrototypeOf(target).hasOwnProperty(event);
  }

  protected useValue(target: T, event: Property) {
    const value = Reflect.get(target, event);
    const isUndef = isUndefined(value);
    const didSet = this.setIfNeeded(target, event, isUndef);
    const useDefault = isUndef && !didSet;

    return {
      useDefault,
      useValue: didSet ? Reflect.get(target, event) : value,
    };
  }

  protected setIfNeeded(target: T, event: Property, isUndef: boolean): boolean {
    return this.shouldSetUndefined(isUndef)
      ? Reflect.set(target, event, this.supplyDefault())
      : false;
  }

  protected shouldSetUndefined(isUndef: boolean): boolean {
    return this.setUndefined && isUndef;
  }

  protected useCriteria(value: TValue | IgnoreCriteria<TValue>) {
    let setValue = value as TValue;
    let ignore = false;

    if (this.shouldIgnore(value)) {
      setValue = value.value;
      ignore = value.ignoreDefaultCriteria;
    }

    return { criteria: ignore ? criteria : this.setCriteria, setValue };
  }

  protected shouldIgnore(value: any): value is IgnoreCriteria {
    return (
      isObject(value) &&
      (value as IgnoreCriteria).ignoreDefaultCriteria !== undefined
    );
  }

  protected supplyDefault(_default = this.defaultValue): TValue {
    return _default;
  }
}

import { defaultsFactory } from './factory';

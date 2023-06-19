import type { Property, IDefaults, IgnoreCriteria, IValueHandler } from '../interfaces';
import { isUndefined, isUnwrapDefaults, isObject } from '../helpers';
import type { OptionsContainer } from '../options';
import { criteria } from '../configuration';

/**
 * @description Base handler for managing wrapped content
 *
 * @export
 * @class Defaults
 * @implements {ProxyHandler<T>}
 * @implements {IDefaults<T, TValue>}
 * @template T
 * @template TValue
 */
export class Defaults<T extends object = {}, TValue = any>
  implements ProxyHandler<T>, IDefaults<T, TValue>
{
  constructor(
    protected readonly options: OptionsContainer<T, TValue>,
    protected readonly value: IValueHandler<TValue>,
  ) {}

  unwrapDefaults(target: T): T {
    return target;
  }

  get(target: T, event: Property): TValue {
    if (isUnwrapDefaults(event)) {
      return this.unwrapDefaults.bind(this, target) as TValue;
    }

    const { useDefault, useValue } = this.useValue(target, event);

    return useDefault ? this.value.supplyDefault(event) : (useValue as TValue);
  }

  set(target: T, property: Property, value: TValue) {
    const { criteria, setValue } = this.determineCriteria(target, property, value);

    const useValue = criteria.call(target, setValue, property, target)
      ? this.value.supplyDefault(property)
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
    return Object.getPrototypeOf(target)?.hasOwnProperty(event) ?? false;
  }

  protected useValue(target: T, event: Property) {
    const value = Reflect.get(target, event);
    const wasUndefined = isUndefined(value);
    const didSet = this.setIfNeeded(target, event, wasUndefined);
    const useDefault = wasUndefined && !didSet;

    return {
      useDefault,
      useValue: didSet ? Reflect.get(target, event) : value,
    };
  }

  protected setIfNeeded(target: T, event: Property, wasUndefined: boolean): boolean {
    return this.shouldSetUndefined(wasUndefined) ? this.setAndRun(target, event) : false;
  }

  protected setAndRun(target: T, event: Property): boolean {
    const value = this.value.supplyDefault(event);
    const didSet = Reflect.set(target, event, value);

    this.options.runAfterSet(event, value, target);

    return didSet;
  }

  protected shouldSetUndefined(wasUndefined: boolean): boolean {
    return this.options.setUndefined && wasUndefined;
  }

  protected useCriteria(value: TValue | IgnoreCriteria<TValue>) {
    let setValue = value as TValue;
    let ignore = false;

    if (this.shouldIgnore(value)) {
      setValue = value.value;
      ignore = value.ignoreDefaultCriteria;
    }

    return { criteria: ignore ? criteria : this.options.setCriteria, setValue };
  }

  protected shouldIgnore(value: any): value is IgnoreCriteria {
    return (
      isObject(value) && (value as IgnoreCriteria).ignoreDefaultCriteria !== undefined
    );
  }
}

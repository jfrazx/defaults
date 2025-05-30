import { isUndefined, isUnwrapDefaults, isObject } from '../../helpers';
import type { OptionsContainer } from '../../options';
import { criteria } from '../../configuration';
import type { Property, IDefaults, IValueHandler, IgnoreCriteria } from '../../interfaces';

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
export class Defaults<T extends object = Record<string, any>, TValue = any>
  implements ProxyHandler<T>, IDefaults<T, TValue>
{
  constructor(
    protected readonly options: OptionsContainer<T, TValue>,
    protected readonly value: IValueHandler<TValue>,
  ) {}

  unwrapDefaults(target: T): T {
    return target;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(target: T, event: Property, _receiver: T): TValue {
    if (isUnwrapDefaults(event)) {
      return this.unwrapDefaults.bind(this, target) as TValue;
    }

    const { useDefault, useValue } = this.useValue(target, event);
    return useDefault ? this.value.supplyDefault(event) : (useValue as TValue);
  }

  set(target: T, property: Property, value: TValue) {
    const determination = this.determineCriteria(target, property, value);
    const useValue: TValue = determination.criteria.call(target, determination.setValue, property, target)
      ? this.value.supplyDefault(property)
      : determination.setValue;

    return Reflect.set(target, property, useValue);
  }

  protected determineCriteria(target: T, property: Property, value: TValue) {
    const determination = this.useCriteria(value);
    const isPrototypeProperty = Object.getPrototypeOf(target)?.hasOwnProperty(property);

    return {
      criteria: isPrototypeProperty ? criteria : determination.criteria,
      setValue: determination.setValue,
    };
  }

  protected useValue(target: T, event: Property) {
    const value = Reflect.get(target, event) as TValue;
    const valueIsUndefined: boolean = isUndefined(value);
    const didSet: boolean = this.setIfNeeded(target, event, valueIsUndefined);
    const useDefault: boolean = valueIsUndefined && !didSet;

    return {
      useDefault,
      useValue: didSet ? Reflect.get(target, event) : value,
    };
  }

  protected setIfNeeded(target: T, event: Property, wasUndefined: boolean): boolean {
    return this.shouldSetUndefined(wasUndefined) ? this.setAndRun(target, event) : false;
  }

  protected setAndRun(target: T, event: Property): boolean {
    const value: TValue = this.value.supplyDefault(event);
    const didSet: boolean = Reflect.set(target, event, value);

    this.options.runAfterSet(event, value, target);

    return didSet;
  }

  protected shouldSetUndefined(wasUndefined: boolean): boolean {
    return this.options.setUndefined && wasUndefined;
  }

  protected useCriteria(value: TValue | IgnoreCriteria<TValue>) {
    if (this.isIgnoreCriteria(value)) {
      return {
        criteria,
        setValue: value.value,
      };
    }

    return {
      criteria: this.options.setCriteria,
      setValue: value,
    };
  }

  protected isIgnoreCriteria(value: any): value is IgnoreCriteria {
    return isObject(value) && (value as IgnoreCriteria).ignoreDefaultCriteria !== undefined;
  }
}

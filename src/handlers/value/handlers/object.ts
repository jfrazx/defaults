import { ValueHandlerRuleRunner } from '../../../rules';
import type { Property } from '../../../interfaces';
import { isObject } from '../../../helpers';
import { ValueHandler } from '../base';

export class ObjectValueHandler<T extends object, TValue> extends ValueHandler<T, object | Array<TValue>> {
  supplyDefault(event: Property) {
    return Array.isArray(this.value)
      ? this.arrayClone(this.value, event)
      : isObject(this.value)
        ? this.objectClone(this.value, event)
        : this.value;
  }

  private arrayClone(array: any[], event: Property): any[] {
    return this.options.shallowCopy ? [...array] : this.reduceArray(array, event);
  }

  private objectClone(object: object, event: Property): object {
    return this.options.shallowCopy
      ? { ...object }
      : Object.assign(Object.create(Object.getPrototypeOf(object)), this.reduceObject(object, event));
  }

  private reduceArray(array: any[], event: Property): any[] {
    return array.map((value: any) =>
      ValueHandlerRuleRunner.for(this.target, value, this.options).supplyDefault(event),
    );
  }

  private reduceObject(object: object, event: Property): object {
    return [
      ...Object.entries(object),
      ...Object.getOwnPropertySymbols(object).map((symbol) => [symbol, (<any>object)[symbol]]),
    ].reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: ValueHandlerRuleRunner.for(this.target, value, this.options).supplyDefault(event),
      }),
      {},
    );
  }
}

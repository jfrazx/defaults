import { ValueHandlerRuleRunner } from '../../../rules';
import { isObject } from '../../../helpers';
import { ValueHandler } from '../base';

export class ObjectValueHandler<T extends object, TValue> extends ValueHandler<
  T,
  object | Array<TValue>
> {
  supplyDefault() {
    return Array.isArray(this.value)
      ? this.arrayClone(this.value)
      : isObject(this.value)
      ? this.objectClone(this.value)
      : this.value;
  }

  private arrayClone(array: any) {
    return this.options.shallowCopy ? [...array] : this.reduceArray(array);
  }

  private objectClone(object: object): object {
    return this.options.shallowCopy
      ? { ...object }
      : Object.assign(
          Object.create(Object.getPrototypeOf(object)),
          this.reduceObject(object),
        );
  }

  private reduceArray(array: any[]): any[] {
    return array.map((value: any) =>
      ValueHandlerRuleRunner.for(this.target, value, this.options).supplyDefault(),
    );
  }

  private reduceObject(object: object): object {
    return [
      ...Object.entries(object),
      ...Object.getOwnPropertySymbols(object).map((symbol) => [
        symbol,
        (<any>object)[symbol],
      ]),
    ].reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: ValueHandlerRuleRunner.for(
          this.target,
          value,
          this.options,
        ).supplyDefault(),
      }),
      {},
    );
  }
}

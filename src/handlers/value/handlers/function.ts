import { ValueHandler } from '../base';

export class FunctionValueHandler<T extends Function, TValue> extends ValueHandler<
  T,
  TValue
> {
  supplyDefault(value: any = this.value): TValue {
    return value.call(this.target);
  }
}

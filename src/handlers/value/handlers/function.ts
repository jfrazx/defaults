import { ValueHandler } from '../base';

export class FunctionValueHandler<
  T extends object,
  TValue extends Function,
> extends ValueHandler<T, TValue> {
  supplyDefault(): TValue {
    return this.value.call(this.target);
  }
}

import { ValueHandler } from '../base';

export class PrimitiveValueHandler<T extends object> extends ValueHandler<
  T,
  string | number | symbol | boolean | Function
> {
  supplyDefault(value: any = this.value): string | number | symbol {
    return value;
  }
}

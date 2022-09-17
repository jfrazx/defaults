import { ValueHandler } from '../base';

type PrimitiveTypes = string | number | symbol | boolean | Function;

export class PrimitiveValueHandler<T extends object> extends ValueHandler<
  T,
  PrimitiveTypes
> {
  supplyDefault(): PrimitiveTypes {
    return this.value;
  }
}

import { PrimitiveValueHandler } from '../../../handlers';
import { ValueHandlerRule } from '../base';
import {
  isNumber,
  isString,
  isSymbol,
  isBoolean,
  isFunction,
  isUndefinedOrNull,
} from '../../../helpers';

export class PrimitiveHandlerRule<T extends object> extends ValueHandlerRule<
  T,
  string | number | symbol | boolean | Function
> {
  shouldHandle(): boolean {
    return [isBoolean, isNumber, isString, isSymbol, isFunction, isUndefinedOrNull].some((is) =>
      is(this.value),
    );
  }

  handle() {
    return new PrimitiveValueHandler(this.target, this.value, this.options);
  }
}

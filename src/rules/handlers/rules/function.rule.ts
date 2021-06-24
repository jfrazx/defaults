import { FunctionValueHandler } from '../../../handlers';
import { isFunction } from '../../../helpers';
import { ValueHandlerRule } from '../base';

export class FunctionHandlerRule extends ValueHandlerRule<() => any, any> {
  shouldHandle(): boolean {
    return isFunction(this.value) && this.options.execute;
  }

  handle() {
    return new FunctionValueHandler(this.target, this.value, this.options);
  }
}

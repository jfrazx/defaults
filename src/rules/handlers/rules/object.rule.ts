import { ObjectValueHandler } from '../../../handlers';
import { isObjectOrArray } from '../../../helpers';
import { ValueHandlerRule } from '../base';

export class ObjectHandlerRule<T extends object> extends ValueHandlerRule<T, object | Array<any>> {
  shouldHandle(): boolean {
    return isObjectOrArray(this.value);
  }

  handle() {
    return new ObjectValueHandler(this.target, this.value, this.options);
  }
}

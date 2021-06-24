import { SetValueHandler } from '../../../handlers';
import { ValueHandlerRule } from '../base';

export class SetHandlerRule<T extends object> extends ValueHandlerRule<T, Set<any>> {
  shouldHandle(): boolean {
    return this.value instanceof Set;
  }

  handle() {
    return new SetValueHandler(this.target, this.value, this.options);
  }
}

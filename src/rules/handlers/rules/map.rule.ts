import { MapValueHandler } from '../../../handlers';
import { ValueHandlerRule } from '../base';

export class MapHandlerRule<T extends object> extends ValueHandlerRule<T, Map<T, any>> {
  shouldHandle(): boolean {
    return this.value instanceof Map;
  }

  handle() {
    return new MapValueHandler(this.target, this.value, this.options);
  }
}

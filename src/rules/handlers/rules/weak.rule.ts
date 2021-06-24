import { PrimitiveHandlerRule } from './primitive.rule';

export class WeakHandlerRule<T extends object> extends PrimitiveHandlerRule<T> {
  shouldHandle(): boolean {
    return this.value instanceof WeakMap || this.value instanceof WeakSet;
  }
}

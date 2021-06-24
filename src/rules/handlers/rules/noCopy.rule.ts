import { PrimitiveHandlerRule } from './primitive.rule';

export class NoCopyHandlerRule<T extends object> extends PrimitiveHandlerRule<T> {
  shouldHandle() {
    return this.options.noCopy;
  }
}

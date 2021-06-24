import { DefaultsArray } from './defaultsArray';
import { TargetReceiver } from './interfaces';

export class DefaultsMap<T extends object, TValue = any> extends DefaultsArray<
  Map<T, TValue>,
  TValue
> {
  protected getTarget({ target }: TargetReceiver<Map<T, TValue>>): Map<T, TValue> {
    return target;
  }

  protected setValue(target: Map<T, TValue>, [key]: any[]) {
    if (this.shouldSetUndefined(true)) {
      target.set(key, this.value.supplyDefault());
    }
  }
}

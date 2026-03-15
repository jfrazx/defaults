import type { IDefaults, MappedType } from '../../../interfaces';
import { DefaultsMap } from '../../../handlers';
import { DefaultRule } from '../base';

export class MapRule<T extends object, TValue> extends DefaultRule<MappedType<T, TValue>, TValue> {
  shouldHandle(): boolean {
    return this.wrap instanceof Map || this.wrap instanceof WeakMap;
  }

  handle(): IDefaults<MappedType<T, TValue>, TValue> {
    return new DefaultsMap<T, TValue>(this.options, this.valueHandler);
  }
}

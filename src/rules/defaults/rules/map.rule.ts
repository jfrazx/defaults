import type { IDefaults } from '../../../interfaces';
import { DefaultsMap } from '../../../defaults';
import { DefaultRule } from '../base';

export class MapRule<T extends object, TValue> extends DefaultRule<Map<T, TValue>, TValue> {
  shouldHandle(): boolean {
    return this.wrap instanceof Map;
  }

  handle(): IDefaults<Map<T, TValue>, TValue> {
    return new DefaultsMap<T, TValue>(this.options, this.valueHandler);
  }
}

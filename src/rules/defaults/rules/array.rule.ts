import type { IDefaults } from '../../../interfaces';
import { DefaultsArray } from '../../../handlers';
import { DefaultRule } from '../base';

export class ArrayRule<T extends object, TValue> extends DefaultRule<T, TValue> {
  shouldHandle(): boolean {
    return Array.isArray(this.wrap);
  }

  handle(): IDefaults<T, TValue> {
    return new DefaultsArray<T, TValue>(this.options, this.valueHandler);
  }
}

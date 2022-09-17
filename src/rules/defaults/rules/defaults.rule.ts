import type { IDefaults } from '../../../interfaces';
import { Defaults } from '../../../defaults';
import { DefaultRule } from '../base';

export class DefaultsRule<T extends object, TValue> extends DefaultRule<T, TValue> {
  shouldHandle(): boolean {
    return true;
  }

  handle(): IDefaults<T, TValue> {
    return new Defaults<T, TValue>(this.options, this.valueHandler);
  }
}

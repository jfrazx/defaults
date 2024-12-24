import type { IDefaults } from '../../../interfaces';
import { DefaultsSet } from '../../../handlers';
import { DefaultRule } from '../base';

export class SetRule<TValue> extends DefaultRule<Set<TValue>, TValue> {
  shouldHandle(): boolean {
    return this.wrap instanceof Set;
  }

  handle(): IDefaults<Set<TValue>, TValue> {
    return new DefaultsSet<TValue>(this.options, this.valueHandler);
  }
}

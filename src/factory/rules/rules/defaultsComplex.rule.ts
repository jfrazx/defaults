import { DefaultsComplex } from '../../../defaults';
import { isObjectOrArray } from '../../../helpers';
import { IDefaults } from '../../../interfaces';
import { DefaultRule } from '../base';

export class DefaultsComplexRule<T extends object, TValue> extends DefaultRule<
  T,
  TValue
> {
  shouldHandle(): boolean {
    return isObjectOrArray(this.defaultValue);
  }
  handle(): IDefaults<T, TValue> {
    return new DefaultsComplex<T, TValue>(this.options);
  }
}

import { DefaultsArrayComplex } from '../../../defaults';
import { IDefaults } from '../../../interfaces';
import { DefaultRule } from '../base';

export class ArrayComplexRule<T extends object, TValue> extends DefaultRule<T, TValue> {
  shouldHandle(): boolean {
    return Array.isArray(this.wrap) && Array.isArray(this.defaultValue);
  }
  handle(): IDefaults<T, TValue> {
    return new DefaultsArrayComplex<T, TValue>(this.options);
  }
}

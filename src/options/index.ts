import type { IDefaultOptions } from '../interfaces';
import { criteria } from '../configuration';

const defaultOptions: Required<IDefaultOptions<any>> = {
  defaultValue: undefined,
  runAfterSet: () => {},
  setCriteria: criteria,
  setUndefined: false,
  reuseMapKey: true,
  shallowCopy: true,
  execute: false,
  noCopy: false,
};

export interface OptionsContainer<T extends object, TValue = any>
  extends Required<IDefaultOptions<T, TValue>> {}

export class OptionsContainer<T extends object, TValue = any> {
  constructor(readonly combinedOptions: IDefaultOptions<T, TValue>) {
    const options = this.mergeOptions(combinedOptions);

    Object.entries(options).forEach(([key, value]) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        value,
      });
    });
  }

  private mergeOptions(
    options: IDefaultOptions<T, TValue>,
  ): Required<IDefaultOptions<T, TValue>> {
    return { ...defaultOptions, ...options };
  }
}

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

// avoiding declaring options on the class with no initializer
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OptionsContainer<T extends object, TValue = any>
  extends Required<IDefaultOptions<T, TValue>> {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OptionsContainer<T extends object, TValue = any>
  implements Required<IDefaultOptions<T, TValue>>
{
  constructor(readonly combinedOptions: IDefaultOptions<T, TValue>) {
    const options = this.mergeOptions(combinedOptions);

    Object.entries(options).forEach(([key, value]) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        value,
      });
    });
  }

  private mergeOptions(options: IDefaultOptions<T, TValue>): Required<IDefaultOptions<T, TValue>> {
    return { ...defaultOptions, ...options };
  }
}

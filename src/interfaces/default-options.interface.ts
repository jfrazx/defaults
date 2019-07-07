import { Criteria } from './criteria.interface';

export interface DefaultOptions<T extends object = {}, TValue = any> {
  /**
   * Function to determine if default value should be used. Returning a truthy value supplies the default
   *
   * @default
   * () => false;
   */
  setCriteria?: Criteria<T, TValue>;
  /**
   * The object or array which to supply default values
   *
   * @default
   * {}
   */
  wrap?: T;

  /**
   * The default value to be supplied
   *
   * @default
   * undefined
   * */
  defaultValue?: TValue;

  /**
   * Set a default value if undefined
   *
   * @default
   * false
   */
  setUndefined?: boolean;

  /**
   * If default is array or object, make a shallow copy when supplying the default
   *
   * @default
   * true
   */
  shallowCopy?: boolean;
}

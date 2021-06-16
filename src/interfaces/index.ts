export type Default<T extends object = {}> = T & Unwrap<T>;

export interface IDefaults<T, TValue> {
  get(target: T, event: Property): TValue;
  set(target: T, property: Property, value: TValue): boolean;
  unwrapDefaults(target: T): T;
}

export type Property = string | number | symbol;

export interface Unwrap<T> {
  unwrapDefaults(): T;
}

export type Criteria<T extends object, TValue = unknown> = (
  value: TValue,
  property: Property,
  target: T
) => boolean;

export interface CriteriaValue<T extends object, TValue = any> {
  criteria: Criteria<T, TValue>;
  setValue: TValue;
}

export interface IgnoreCriteria<TValue = any> {
  ignoreDefaultCriteria: boolean;
  value: TValue;
}

export interface DefaultOptions<T extends object = {}, TValue = any>
  extends IDefaultOptions<T, TValue> {
  /**
   * The object or array which to supply default values
   *
   * @default
   * {}
   */
  wrap?: T;
}

export interface IDefaultOptions<T extends object = {}, TValue = any> {
  /**
   * Function to determine if default value should be used. Returning a truthy value supplies the default
   *
   * @default
   * () => false;
   */
  setCriteria?: Criteria<T, TValue>;

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


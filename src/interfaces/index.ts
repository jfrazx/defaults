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
  target: T,
) => boolean;

export interface CriteriaValue<T extends object, TValue = any> {
  criteria: Criteria<T, TValue>;
  setValue: TValue;
}

export interface IgnoreCriteria<TValue = any> {
  ignoreDefaultCriteria: boolean;
  value: TValue;
}

export type DefaultOptions<T extends object = {}, TValue = any> =
  | {
      /**
       * The object or array which to supply default values
       *
       * @default {}
       */
      wrap?: T;
    } & Omit<IDefaultOptions<T, TValue>, 'execute' | 'defaultValue'> &
      ExecuteFunction<TValue>;

export interface IDefaultOptions<T extends object, TValue = any> {
  /**
   * Function to determine if default value should be used. Returning a truthy value supplies the default
   *
   * @default () => false
   */
  setCriteria?: Criteria<T, TValue>;

  /**
   * Set a default value if undefined
   *
   * @default false
   */
  setUndefined?: boolean;

  /**
   * If default is array or object, make a shallow copy when supplying the default
   *
   * @default true
   */
  shallowCopy?: boolean;

  /**
   * If true and default value is a Map the key will be reused.
   * If false and default value is a Map the key will be cloned using shallowCopy rules.
   *
   * @default true
   */
  reuseMapKey?: boolean;

  /**
   * Indicates if non-primitive default values should be returned as-is
   *
   * @default false
   * @type {boolean}
   * @memberof IDefaultOptions
   */
  noCopy?: boolean;

  /**
   * If true and default value is a function said function will be executed and the result returned
   *
   * @default false
   * @type {boolean}
   * @memberof IDefaultOptions
   */
  execute?: boolean;
  /**
   * The default value to be supplied
   *
   * @default undefined
   * */
  defaultValue?: TValue;
}

export type ExecuteFunction<TValue> =
  | {
      /**
       * If true and default value is a function said function will be executed and the result returned
       *
       * @default false
       * @type {boolean}
       * @memberof IDefaultOptions
       */
      execute: true;
      /**
       * The default value to be supplied
       *
       * @default undefined
       * */
      defaultValue: () => TValue;
    }
  | {
      /**
       * If true and default value is a function said function will be executed and the result returned
       *
       * @default false
       * @type {boolean}
       * @memberof IDefaultOptions
       */
      execute?: false | undefined;
      /**
       * The default value to be supplied
       *
       * @default undefined
       * */
      defaultValue?: TValue;
    };

export interface IValueHandler<TValue> {
  supplyDefault(value?: any): TValue;
}

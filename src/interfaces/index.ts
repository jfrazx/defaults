export type Default<WrappedObject extends object = {}> = WrappedObject &
  Unwrap<WrappedObject>;

export interface IDefaults<WrappedObject, DefaultValue> {
  get(target: WrappedObject, event: Property): DefaultValue;
  set(target: WrappedObject, property: Property, value: DefaultValue): boolean;
  unwrapDefaults(target: WrappedObject): WrappedObject;
}

export type Property = string | number | symbol;

export interface Unwrap<WrappedObject> {
  unwrapDefaults(): WrappedObject;
}

export type Criteria<WrappedObject extends object, DefaultValue = unknown> = (
  value: DefaultValue,
  property: Property,
  target: WrappedObject,
) => boolean;

export interface CriteriaValue<WrappedObject extends object, DefaultValue = any> {
  criteria: Criteria<WrappedObject, DefaultValue>;
  setValue: DefaultValue;
}

export interface IgnoreCriteria<DefaultValue = any> {
  ignoreDefaultCriteria: boolean;
  value: DefaultValue;
}

export type DefaultOptions<WrappedObject extends object = {}, DefaultValue = any> =
  | {
      /**
       * The object or array which to supply default values
       *
       * @default {}
       */
      wrap?: WrappedObject;
    } & Omit<IDefaultOptions<WrappedObject, DefaultValue>, 'execute' | 'defaultValue'> &
      ExecuteFunction<DefaultValue>;

export interface IDefaultOptions<WrappedObject extends object, DefaultValue = any> {
  /**
   * Function to determine if default value should be used. Returning a truthy value supplies the default
   *
   * @default () => false
   */
  setCriteria?: Criteria<WrappedObject, DefaultValue>;

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
  defaultValue?: DefaultValue;
}

export type DefaultGenerator<DefaultValue> = (key: Property) => DefaultValue;

export type ExecuteFunction<DefaultValue> =
  | {
      /**
       * If true and default value is a function, said function will be executed and the result returned
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
      defaultValue: DefaultGenerator<DefaultValue>;
    }
  | {
      /**
       * If true and default value is a function, said function will be executed and the result returned
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
      defaultValue?: DefaultValue;
    };

export interface IValueHandler<DefaultValue> {
  supplyDefault(event: Property): DefaultValue;
}

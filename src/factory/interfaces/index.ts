import { IDefaults, IDefaultOptions } from '../../interfaces';

export interface ShouldHandle<T> {
  shouldHandle(): boolean;
  handle(): T;
}

export interface DefaultRuleConstruct<T extends object, TValue> {
  new (wrap: T, defaultValue: TValue, options: IDefaultOptions<T, TValue>): ShouldHandle<
    IDefaults<T, TValue>
  >;
}

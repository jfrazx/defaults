import type { IDefaults, IValueHandler } from '../../interfaces';
import type { OptionsContainer } from '../../options';

export interface ShouldHandle<T> {
  shouldHandle(): boolean;
  handle(): T;
}

export interface DefaultRuleConstruct<T extends object, TValue> {
  new (
    wrap: T,
    options: OptionsContainer<T, TValue>,
    valueHandler: IValueHandler<TValue>,
  ): ShouldHandle<IDefaults<T, TValue>>;
}

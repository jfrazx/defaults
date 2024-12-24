import type { IValueHandler, Property } from '../../../interfaces';
import type { OptionsContainer } from '../../../options';

export abstract class ValueHandler<T extends object, TValue> implements IValueHandler<TValue> {
  constructor(
    protected readonly target: T,
    public readonly value: TValue,
    protected readonly options: OptionsContainer<T, TValue>,
  ) {}

  abstract supplyDefault(event: Property): TValue;
}

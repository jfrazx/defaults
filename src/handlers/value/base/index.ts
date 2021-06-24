import { OptionsContainer } from '../../../options';
import { IValueHandler } from '../../../interfaces';

export abstract class ValueHandler<T extends object, TValue>
  implements IValueHandler<TValue>
{
  constructor(
    protected readonly target: T,
    protected readonly value: TValue,
    protected readonly options: OptionsContainer<T, TValue>,
  ) {}

  abstract supplyDefault(value?: any): TValue;
}

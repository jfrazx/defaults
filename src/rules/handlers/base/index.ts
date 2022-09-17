import type { OptionsContainer } from '../../../options';
import type { IValueHandler } from '../../../interfaces';
import type { ShouldHandle } from '../../interfaces';

export abstract class ValueHandlerRule<T extends object, TValue>
  implements ShouldHandle<IValueHandler<TValue>>
{
  constructor(
    protected readonly target: T,
    protected readonly value: TValue,
    protected readonly options: OptionsContainer<T, TValue>,
  ) {}

  abstract shouldHandle(): boolean;
  abstract handle(): IValueHandler<TValue>;
}

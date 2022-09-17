import type { IDefaults, IValueHandler } from '../../../interfaces';
import type { OptionsContainer } from '../../../options';
import type { ShouldHandle } from '../../interfaces';

export abstract class DefaultRule<T extends object, TValue>
  implements ShouldHandle<IDefaults<T, TValue>>
{
  constructor(
    protected readonly wrap: T,
    protected readonly options: OptionsContainer<T, TValue>,
    protected readonly valueHandler: IValueHandler<TValue>,
  ) {}

  abstract shouldHandle(): boolean;
  abstract handle(): IDefaults<T, TValue>;
}

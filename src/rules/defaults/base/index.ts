import { IDefaults, IValueHandler } from '../../../interfaces';
import { OptionsContainer } from '../../../options';
import { ShouldHandle } from '../../interfaces';

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

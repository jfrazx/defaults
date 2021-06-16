import { IDefaults, IDefaultOptions } from '../../../interfaces';
import { ShouldHandle } from '../../interfaces';

export abstract class DefaultRule<T extends object, TValue>
  implements ShouldHandle<IDefaults<T, TValue>>
{
  constructor(
    protected readonly wrap: T,
    protected readonly defaultValue: TValue,
    protected readonly options: IDefaultOptions<T, TValue>,
  ) {}

  abstract shouldHandle(): boolean;
  abstract handle(): IDefaults<T, TValue>;
}

import { PrimitiveHandlerRule } from './primitive.rule';
import { FunctionHandlerRule } from './function.rule';
import { OptionsContainer } from '../../../options';
import { IValueHandler } from '../../../interfaces';
import { NoCopyHandlerRule } from './noCopy.rule';
import { ObjectHandlerRule } from './object.rule';
import { ShouldHandle } from '../../interfaces';
import { WeakHandlerRule } from './weak.rule';
import { MapHandlerRule } from './map.rule';
import { SetHandlerRule } from './set.rule';

interface ValueRuleConstruct<T extends object, TValue> {
  new (target: T, value: TValue, options: OptionsContainer<T, TValue>): ShouldHandle<
    IValueHandler<TValue>
  >;
}

export const getValueHandlerRules = <T extends object, TValue>() => {
  return [
    NoCopyHandlerRule,
    MapHandlerRule,
    SetHandlerRule,
    WeakHandlerRule,
    ObjectHandlerRule,
    FunctionHandlerRule,
    PrimitiveHandlerRule,
  ] as unknown as ValueRuleConstruct<T, TValue>[];
};

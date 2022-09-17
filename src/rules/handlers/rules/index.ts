import type { OptionsContainer } from '../../../options';
import type { IValueHandler } from '../../../interfaces';
import { PrimitiveHandlerRule } from './primitive.rule';
import { FunctionHandlerRule } from './function.rule';
import type { ShouldHandle } from '../../interfaces';
import { NoCopyHandlerRule } from './noCopy.rule';
import { ObjectHandlerRule } from './object.rule';
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

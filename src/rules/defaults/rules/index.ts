import type { DefaultRuleConstruct } from '../../interfaces';
import { DefaultsRule } from './defaults.rule';
import { ArrayRule } from './array.rule';
import { MapRule } from './map.rule';
import { SetRule } from './set.rule';

export const getDefaultsRules = <T extends object, TValue>(): DefaultRuleConstruct<
  T,
  TValue
>[] => {
  return [ArrayRule, MapRule, SetRule, DefaultsRule] as any;
};

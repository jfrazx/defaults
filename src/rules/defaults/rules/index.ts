import { DefaultRuleConstruct } from '../../interfaces';
import { DefaultsRule } from './defaults.rule';
import { ArrayRule } from './array.rule';
import { MapRule } from './map.rule';

export const getDefaultsRules = <T extends object, TValue>(): DefaultRuleConstruct<
  T,
  TValue
>[] => {
  return [ArrayRule, MapRule, DefaultsRule] as any;
};

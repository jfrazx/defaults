import { DefaultsComplexRule } from './defaultsComplex.rule';
import { DefaultRuleConstruct } from '../../interfaces';
import { ArrayComplexRule } from './arrayComplex.rule';
import { DefaultsRule } from './defaults.rule';
import { ArrayRule } from './array.rule';

export const rules: DefaultRuleConstruct<any, any>[] = [
  ArrayComplexRule,
  ArrayRule,
  DefaultsComplexRule,
  DefaultsRule,
];

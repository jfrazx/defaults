import { DefaultsEvent } from '../enums';

export function isUnwrapDefaults(value: any): boolean {
  return value === DefaultsEvent.Unwrap;
}

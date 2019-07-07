export function isObject(value: any): value is object {
  return value && Array.isArray(value) === false && typeof value === 'object';
}

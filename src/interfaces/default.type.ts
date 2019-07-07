import { Unwrap } from './unwrap.interface';

export type Default<T extends object = {}> = T & Unwrap<T>;

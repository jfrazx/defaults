export interface TargetReceiver<T extends object> {
  target: T;
  receiver?: T;
}

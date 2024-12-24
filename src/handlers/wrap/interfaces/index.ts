export interface TargetReceiver<T extends object> {
  receiver?: T;
  target: T;
}

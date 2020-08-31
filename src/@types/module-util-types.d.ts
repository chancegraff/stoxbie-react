declare module "util-types" {
  declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
}

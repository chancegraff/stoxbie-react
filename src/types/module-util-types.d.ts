declare module "util-types" {
  declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
  declare type DeepRequired<T, P extends string[]> = T extends Record<string, unknown>
    ? (Omit<T, Extract<keyof T, P[0]>> &
    Required<
    {
      [K in Extract<keyof T, P[0]>]: NonNullable<
      DeepRequired<T[K], ShiftUnion<P>>
      >
    }
    >)
    : T;
}

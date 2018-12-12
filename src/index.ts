export type _IsEqual<A, B> = A | B extends A & B ? true : false

export type IsNever<T> = _IsEqual<T, never>

export const isNever = <A>(_true: IsNever<A>) => {}

export type IsEqual<A, B> =
  _IsEqual<A, B> extends false ? false :
  _IsEqual<keyof A, keyof B> extends false ? false :
  true

export const isEqual = <A, B>(_true: IsEqual<A, B>) => {}

export type NotUndefined<T> = T extends undefined ? never : T

export type Property<B, T extends B, K extends keyof B, D extends B[K] = B[K]> =
  NotUndefined<K extends keyof T ? T[K] : D>

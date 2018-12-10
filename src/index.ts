export type _IsEqual<A, B> = A | B extends A & B ? true : false

export type IsNever<T> = _IsEqual<T, never>

export const isNever = <A>(_true: IsNever<A>) => {}

export type IsEqual<A, B> =
  _IsEqual<A, B> extends false ? false :
  _IsEqual<keyof A, keyof B> extends false ? false :
  true

export const isEqual = <A, B>(_true: IsEqual<A, B>) => {}

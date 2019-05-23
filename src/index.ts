export type IsNever<T> = IsEqual<T, never>

export const isNever = <A>(_true: IsNever<A>) => {}

/**
 * The meta-function can't handle types that's merged with `object`.
 */
export type IsEqual<A, B> =
  A | B extends A & B ? true : false

// export type _IsEqual<A, B> = [A | B] extends [A & B] ? true : false

/*
export type IsEqual<A, B> =
  Subset<A, B> extends false ? false :
  Subset<B, A> extends false ? false :
  true
*/

/*
export type IsEqual<A, B> =
  _IsEqual<A, B> extends false ? false :
  _IsEqual<keyof A, keyof B> extends false ? false :
  true
*/

/*
export type IsEqual<A, B> =
  IsNever<A> extends true ? IsNever<B> extends true ? true : false :
  A extends B ? B extends A ? true : false : false
*/

export const isEqual = <A, B>(_true: IsEqual<A, B>) => {}

export type NotUndefined<T> = T extends undefined ? never : T

export type Property<B, T extends B, K extends keyof B, D extends B[K] = B[K]> =
  NotUndefined<K extends keyof T ? T[K] : D>

export type ArrayItem<T extends readonly unknown[]> =
  T extends readonly (infer U)[] ? U : never

//

export type EnumSchema = { readonly enum: readonly string[] }

export type FromSchema<T extends EnumSchema> = ArrayItem<T['enum']>

export type EnumInfo<T extends EnumSchema> = { readonly [k in FromSchema<T>]: k }

export const enumInfo = <T extends { readonly enum: readonly FromSchema<T>[] }>(schema: T): EnumInfo<T> => {
  type E = FromSchema<T>
  const result: { [k in E]?: k } = {}
  for (const i of schema.enum) {
    result[i] = i
  }
  return result as { readonly [k in E]: k }
}

//

const myEnumSchema = {
  enum: [
    "A",
    "B"
  ]
} as const

export type MyEnum = FromSchema<typeof myEnumSchema>

export const myEnumInfo = enumInfo(myEnumSchema)

export const x = myEnumInfo.A

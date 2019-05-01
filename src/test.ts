import * as index from "./index"

index.isNever<never>(true)
index.isNever<unknown>(false)

index.isEqual<number, number>(true)
index.isEqual<number, string>(false)
index.isEqual<never, never>(true)
index.isEqual<boolean|null, boolean>(false)
index.isEqual<
  { readonly [K in string]: number|undefined },
  { readonly [K in string]?: number } & object
>(true)
index.isEqual<
  { readonly [K: string]: null|undefined },
  { readonly [K: string]: null|undefined }
>(true)

type A = { readonly a?: true, readonly b?: true, readonly c?: boolean }
type B = { readonly b: true }

index.isEqual<index.Property<A, B, "a">, true>(true)
index.isEqual<index.Property<A, B, "b">, true>(true)
index.isEqual<index.Property<A, B, "c">, boolean>(true)
index.isEqual<index.Property<A, B, "c", false>, false>(true)

index.isEqual<index.ArrayItem<["A", "B"]>, "A"|"B">(true)

index.isEqual<object, object>(true)

type XNull = { readonly [K in string]?: null }
type XString = { readonly [K in string]?: string }

type ONull = XNull & object
type OString = XString & object

type Properties<T> = { readonly [K in keyof T]: T[K] }

index.isEqual<XNull, XString>(false)
index.isEqual<ONull, OString>(true) // should be false

type PNull = Properties<ONull>
type PString = Properties<OString>

index.isEqual<PNull, PString>(true) // should be false

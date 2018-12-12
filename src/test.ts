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

type A = { readonly a?: true, readonly b?: true }
type B = { readonly b: true }

index.isEqual<index.Property<A, B, "a">, undefined|true>(true)
index.isEqual<index.Property<A, B, "b">, true>(true)

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

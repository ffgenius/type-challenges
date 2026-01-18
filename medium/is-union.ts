/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium #union

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > View on GitHub: https://tsch.js.org/1097
*/

import type { Equal, Expect } from '@type-challenges/utils'

/*
* 解析思路：
* 将 T 进行条件分发
* 并判断 [B] extends [T]
* [string | number] extends [string] ? false : true // true
* 因为 B 是联合类型，而 T 只是联合类型中的某个类型，因此 [B] extends [T] 为 true，表明 B 是一个联合类型
* 如果 B 不是联合类型，假设为 string，那么就是 [string] extends [string] 则为 false
*
* https://github.com/type-challenges/type-challenges/issues/1140 (存在边界错误)
* */
type IsUnion<T, B = T> = [T] extends [never] ? false : T extends B ? [B] extends [T] ? false : true : never;

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
  Expect<Equal<IsUnion<(() => string) | (() => number)>, true>>,
]

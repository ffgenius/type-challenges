/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #中等 #union #utils

  ### 题目

  实现一个名为 IsNever 的类型，该类型接受输入类型 `T`。
  如果type解析为 `never`，则返回 `true`，否则返回 `false`。

  例如:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > View on GitHub: https://tsch.js.org/1042
*/

import type { Equal, Expect } from '@type-challenges/utils'

// never extends never is false
type IsNever<T> = [T] extends [never] ? true : false

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]


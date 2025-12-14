/*
  3060 - Unshift
  -------
  by jiangshan (@jiangshanmeta) #简单 #array

  ### 题目

  实现类型版本的 ```Array.unshift```。

  例如：

  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2]
  ```

  > 在 Github 上查看：https://tsch.js.org/3060/zh-CN
*/

import type { Equal, Expect } from '@type-challenges/utils'

type Unshift<T extends unknown[], U> = [U, ...T]

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]


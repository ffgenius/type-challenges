/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #中等 #template-literal #infer

  ### 题目

  从字符串中剔除指定字符。

  例如：

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > 在 Github 上查看：https://tsch.js.org/2070/zh-CN
*/

import type { Equal, Expect } from '@type-challenges/utils'

type DropChar<S extends string, C extends string> = S extends `${C}${infer R}`
  ? DropChar<R, C>
  : S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S


type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

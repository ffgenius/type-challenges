/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

import type { Equal, Expect } from '@type-challenges/utils'

/*
 * 解题思路
 *
 * 1. 基础认知
 * ------------------------------------------------
 * keyof any = string | number | symbol
 *
 * keyof Foo    = string | "foo"
 * keyof Bar    = number | "bar" | 0
 * keyof FooBar = symbol | typeof foobar
 *
 * K in keyof T        -> 取出 T 的所有 key
 * K in keyof T as ... -> 对 key 进行条件过滤（key remapping）
 *
 *
 * 2. extends 判断方向说明
 * ------------------------------------------------
 * extends 在联合类型中是「整体判断」，不是逐项判断：
 *
 * 1) string extends string              // true
 * 2) string | number | symbol extends string // false
 * 3) string extends "string"            // false
 *
 * 3. 索引签名的本质特征
 * ------------------------------------------------
 * 索引签名对应的是「宽泛 key」，而不是字面量 key：
 *
 * - string 索引签名  => string extends K
 * - number 索引签名  => number extends K
 * - symbol 索引签名  => symbol extends K
 *
 * 字面量 key（如 "foo"、0、typeof foobar）：
 * - string/number/symbol 都不能 extends 它们
 *
 *
 * 4. 过滤逻辑总结
 * ------------------------------------------------
 * 如果命中索引签名（宽泛 key） -> 过滤掉（never）
 * 否则（字面量 key）           -> 保留
 */
type RemoveIndexSignature<T, P = keyof any> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
}

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

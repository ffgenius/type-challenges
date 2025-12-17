/*
  12 - 可串联构造器
  -------
  by Anthony Fu (@antfu) #中等 #application

  ### 题目

  在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

  在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

  例如

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 期望 result 的类型是：
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

  你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

  > 在 Github 上查看：https://tsch.js.org/12/zh-CN
*/

import type { Alike, Expect } from '@type-challenges/utils'

/* 
* 解题思路
* 定义一个泛型 T，默认为空对象
* K extends (PropertyKey = keyof any), V 泛型约束 key 为属性名，value 为属性值
* 每一个 option 返回的都是一个新的 Chainable 类型 这样才能支持链式
* T = {} 初始是空对象，key: K extends keyof T ? never : K 
* Omit<T, K> 将之前的 T 中的
* 当读取到已经存在的 key 时返回 never，阻止重复添加同名属性
*/
type Chainable<T = {}> = {
  option<K extends PropertyKey, V>(key: K extends keyof T ? never : K, value: V): Chainable<Omit<T, K> & { [P in K]: V }>
  get(): {
    [P in keyof T]: T[P]
  }
}

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

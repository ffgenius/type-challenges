/*
  3 - 实现 Omit
  -------
  by Anthony Fu (@antfu) #中等 #union #built-in

  ### 题目

  不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

  `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > 在 Github 上查看：https://tsch.js.org/3/zh-CN
*/

import type { Equal, Expect } from '@type-challenges/utils'

/*
* K extends keyof T ,K 必须为 T 存在的属性
* [P in keyof T] 遍历出 T 的所有属性
* [P in keyof T as...] as (映射类型) 后可以重写属性名，当判断为 never 时可以删除这个属性，否则保留 （其实也就是对属性值做补充判断）
* as P extends K ? never : P 是整个类型的 灵魂 (soul)
* */
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
// type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

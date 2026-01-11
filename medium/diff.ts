/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #中等 #object

  ### 题目

  获取两个接口类型中的差值属性。

  ```ts
  type Foo = {
    a: string;
    b: number;
  }
  type Bar = {
    a: string;
    c: boolean
  }

  type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
  type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }

  ```

  > 在 Github 上查看：https://tsch.js.org/645/zh-CN
*/

import type { Equal, Expect } from '@type-challenges/utils'

type Diff<O, O1> = {
  [K in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]:
    K extends keyof O1 ? O1[K] : K extends keyof O ? O[K] : never
}

/*
* 解题思路
* 1. O & O1 合并两个对象类型，包含两者的所有属性（同名属性会合并类型， 如 O: { name: string }, O: { name: number }, 合并后为 O: { name: never }）
* 2. O | O1 示例 type A = Foo | Bar，A中的属性必须是两者共有的 key, 否则 ts 无法确定当前值具体是哪一种类型
* */
// type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: number
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

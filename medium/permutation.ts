/*
  296 - Permutation (这题超难)
  -------
  by Naoto Ikuno (@pandanoir) #中等 #union

  ### 题目

  实现联合类型的全排列, 将联合类型转换成所有可能的全排列数组的联合类型。

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > 在 Github 上查看: https://tsch.js.org/296/zh-CN
*/

import type { Equal, Expect } from '@type-challenges/utils'

/*
 * 解题思路（这题很经典）
 *
 * T, K = T:
 * 由于这里使用了递归,
 * - T: 表示当前递归轮次中「还未被使用的联合类型元素」
 * - K: 用于触发条件类型分发的“快照”, 固定为当前层级的 T
 *
 * [T] extends [never]:
 * 用于判断递归是否终止。
 * 当 T 被消耗为 never 时, 说明已经没有元素可继续排列, 返回空元组 []
 *
 * 为什么不使用 T extends never？
 * 因为 T 是裸类型（naked type）, 在条件类型中会触发分发行为；
 * 而 [T] extends [never] 中的 T 已被包裹, 不再是裸类型,
 * 这里只是单纯判断 T 是否整体为 never
 *
 * K extends K:
 * 这是刻意写成“恒成立”的条件, 用来触发条件类型的分发,
 * 从而枚举联合类型 K 中的每一个成员
 *
 * [K, ...Permutation<Exclude<T, K>>]:
 * 表示当前排列中选取 K 作为第一个元素,
 * 并对剩余的元素（Exclude<T, K>）继续进行全排列,
 * 最终通过递归回溯拼接成完整的元组
 *
 * 执行过程示例（完整展开）:
 *
 * 初始调用:
 * Permutation<'A' | 'B' | 'C'>
 *
 * ─────────────────────────────
 * 第 1 层递归:
 *
 * T = 'A' | 'B' | 'C'
 * K = 'A' | 'B' | 'C'
 *
 * 触发条件类型分发（K extends K）:
 *
 * = ['A', ...Permutation<Exclude<'A' | 'B' | 'C', 'A'>>]
 * | ['B', ...Permutation<Exclude<'A' | 'B' | 'C', 'B'>>]
 * | ['C', ...Permutation<Exclude<'A' | 'B' | 'C', 'C'>>]
 *
 * 即:
 *
 * = ['A', ...Permutation<'B' | 'C'>]
 * | ['B', ...Permutation<'A' | 'C'>]
 * | ['C', ...Permutation<'A' | 'B'>]
 *
 * ─────────────────────────────
 * 第 2 层递归:
 *
 * A 分支:
 * Permutation<'B' | 'C'>
 *
 * T = 'B' | 'C'
 * K = 'B' | 'C'
 *
 * 再次触发分发:
 *
 * = ['B', ...Permutation<Exclude<'B' | 'C', 'B'>>]
 * | ['C', ...Permutation<Exclude<'B' | 'C', 'C'>>]
 *
 * 即:
 *
 * = ['B', ...Permutation<'C'>]
 * | ['C', ...Permutation<'B'>]
 *
 * 最后得到:
 * ['A', ...['B', ...Permutation<'C'>]] | ['A', ...['C', ...Permutation<'B'>]]
 * | ['B', ...['A', ...Permutation<'C'>]] | ['B', ...['C', ...Permutation<'A'>]]
 * | ['C', ...['A', ...Permutation<'B'>]] | ['C', ...['B', ...Permutation<'A'>]]
 *
 * ─────────────────────────────
 * 第 3 层递归:
 *
 * Permutation<'C'>
 *
 * T = 'C'
 * K = 'C'
 *
 * 分发结果:
 *
 * = ['C', ...Permutation<Exclude<'C', 'C'>>]
 * = ['C', ...Permutation<never>]
 *
 * 最后得到:
 * ['A', ...['B', ...['C']]] | ['A', ...['C', ...['B']]]
 * | ['B', ...['A', ...['C']]] | ['B', ...['C', ...['A']]]
 * | ['C', ...['A', ...['B']]] | ['C', ...['B', ...['A']]]
 *
 * ─────────────────────────────
 * 递归终止条件:
 *
 * Permutation<never>
 * => []
 *
 * ─────────────────────────────
 * 回溯拼接结果:
 * =>
 * | ['A', 'B', 'C']
 * | ['A', 'C', 'B']
 * | ['B', 'A', 'C']
 * | ['B', 'C', 'A']
 * | ['C', 'A', 'B']
 * | ['C', 'B', 'A']
 */
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

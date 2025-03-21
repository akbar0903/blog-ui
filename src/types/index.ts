export * from './admin.ts'
export * from './article.ts'
export * from './statistic.ts'
export * from './category.ts'
export * from './feature-plan.ts'

/**
 * 后端返回数据类型
 */
export type ApiResponse<T> = {
  code: number
  msg: string
  data: T
}

/**
 * 文章数据类型
 */
export type ArticleData = {
  id: number
  title: string
  summary: string
  content: string
  coverImage: string
  state: number
  categoryName: string
  tagNames: string[]
  createdTime: string
  updatedTime: string
}

export type ArticlePageParams = {
  pageNum?: number
  pageSize?: number
  categoryId?: number
  state?: number
  title?: string
}

import { ArticlePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getArticleListAPI = (data: ArticlePageParams): Promise<PageResult> => {
  return request({
    url: 'article/list',
    method: 'POST',
    data: data,
  })
}

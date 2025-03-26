import { ArticleData, ArticlePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getArticleListAPI = (data: ArticlePageParams): Promise<PageResult<ArticleData[]>> => {
  return request({
    url: 'article/list',
    method: 'POST',
    data: data,
  })
}

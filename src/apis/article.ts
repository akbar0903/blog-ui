import { ApiResponse, ArticlePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getArticleListAPI = (data: ArticlePageParams): Promise<ApiResponse<PageResult>> => {
  return request({
    url: 'article/list',
    method: 'POST',
    data: data,
  })
}

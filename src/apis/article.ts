import { ArticleAddType, ArticleData, ArticlePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getArticleListAPI = (data: ArticlePageParams): Promise<PageResult<ArticleData[]>> => {
  return request({
    url: '/article/list',
    method: 'POST',
    data: data,
  })
}

export const addArticleAPI = (data: ArticleAddType): Promise<null> => {
  return request({
    url: '/article',
    method: 'POST',
    data: data,
  })
}

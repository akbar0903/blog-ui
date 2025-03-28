import { ArticleAddEditType, ArticleData, ArticlePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getArticleListAPI = (data: ArticlePageParams): Promise<PageResult<ArticleData[]>> => {
  return request({
    url: '/article/list',
    method: 'POST',
    data: data,
  })
}

export const addArticleAPI = (data: ArticleAddEditType): Promise<null> => {
  return request({
    url: '/article',
    method: 'POST',
    data: data,
  })
}

export const getArticleInfoAPI = (id: number): Promise<ArticleData> => {
  return request({
    url: '/article/info',
    method: 'GET',
    params: {
      id: id,
    },
  })
}

export const deleteArticleAPI = (id: number): Promise<null> => {
  return request({
    url: `/article/${id}`,
    method: 'DELETE',
  })
}

export const updateArticleAPI = (data: ArticleAddEditType): Promise<null> => {
  return request({
    url: '/article',
    method: 'PUT',
    data: data,
  })
}

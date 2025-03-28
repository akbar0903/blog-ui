import { request } from '@/utils'

export const getTagIdsAPI = (articleId: number): Promise<number[]> => {
  return request({
    url: '/article-tag',
    method: 'GET',
    params: {
      articleId: articleId,
    },
  })
}

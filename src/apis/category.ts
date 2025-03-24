import { Category } from '@/types'
import { request } from '@/utils'

export const getCategoryListAPI = (): Promise<Category[]> => {
  return request({
    url: '/category/list',
    method: 'GET',
  })
}

import { ApiResponse, Category } from '@/types'
import { request } from '@/utils'

export const getCategoryListAPI = (): Promise<ApiResponse<Category[]>> => {
  return request({
    url: '/category/list',
    method: 'GET',
  })
}

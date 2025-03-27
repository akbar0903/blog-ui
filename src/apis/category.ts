import { CategoryType } from '@/types'
import { request } from '@/utils'

export const getCategoryListAPI = (): Promise<CategoryType[]> => {
  return request({
    url: '/category/list',
    method: 'GET',
  })
}

export const deleteCategoryAPI = (id: number): Promise<null> => {
  return request({
    url: `/category/${id}`,
    method: 'DELETE',
  })
}

export const addCategoryAPI = (name: string): Promise<null> => {
  return request({
    url: '/category',
    method: 'POST',
    params: {
      name: name,
    },
  })
}

export const updateCategoryAPI = (id: number, name: string): Promise<null> => {
  return request({
    url: `/category`,
    method: 'PUT',
    params: {
      id: id,
      name: name,
    },
  })
}

// 回显分类
export const getCategoryInfoAPI = (id: number): Promise<CategoryType> => {
  return request({
    url: '/category/info',
    method: 'GET',
    params: {
      id: id,
    },
  })
}

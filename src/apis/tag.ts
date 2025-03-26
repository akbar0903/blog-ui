import { TagData } from '@/types'
import { request } from '@/utils'

export const getTagListAPI = (): Promise<TagData[]> => {
  return request({
    url: '/tag/list',
    method: 'GET',
  })
}

export const getTagInfoAPI = (id: number): Promise<TagData> => {
  return request({
    url: '/tag/info',
    method: 'GET',
    params: {
      id: id,
    },
  })
}

export const updateTagAPI = (id: number, name: string): Promise<null> => {
  return request({
    url: `/tag/${id}`,
    method: 'PUT',
    params: {
      name: name,
    },
  })
}

export const addTagAPI = (name: string): Promise<null> => {
  return request({
    url: '/tag',
    method: 'POST',
    params: {
      name: name,
    },
  })
}

export const deleteTagAPI = (id: number): Promise<null> => {
  return request({
    url: `/tag/${id}`,
    method: 'DELETE',
  })
}

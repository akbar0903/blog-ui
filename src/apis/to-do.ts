import { ToDo, ToDoParams } from '@/types'
import { request } from '@/utils'

export const getToDoListAPI = (): Promise<ToDo[]> => {
  return request({
    url: '/todo/list',
    method: 'GET',
  })
}

export const addToDoAPI = (data: ToDoParams): Promise<null> => {
  return request({
    url: '/todo',
    method: 'POST',
    params: {
      ...data,
    },
  })
}

export const deleteToDoAPI = (id: number): Promise<null> => {
  return request({
    url: `/todo/${id}`,
    method: 'DELETE',
  })
}

export const toggleToDoAPI = (id: number): Promise<null> => {
  return request({
    url: '/todo/toggle',
    method: 'PATCH',
    params: {
      id: id,
    },
  })
}

export const updateToDoAPI = (id: number, title: string): Promise<null> => {
  return request({
    url: '/todo',
    method: 'PUT',
    params: {
      id: id,
      title: title,
    },
  })
}

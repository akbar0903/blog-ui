import { request } from '@/utils'
import { LoginForm } from '@/types'

export const loginAPI = (data: LoginForm) => {
  return request({
    url: 'admin/login',
    method: 'POST',
    data: data,
  })
}

export const loginInfoAPI = () => {
  return request({
    url: '/admin/current-admin-info',
    method: 'GET',
  })
}

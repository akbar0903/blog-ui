import { request } from '@/utils'
import { AdminInfo, LoginForm, UpdataAdmin } from '@/types'

export const loginAPI = (data: LoginForm): Promise<string> => {
  return request({
    url: 'admin/login',
    method: 'POST',
    data: data,
  })
}

export const getLoginInfoAPI = (): Promise<AdminInfo> => {
  return request({
    url: '/admin/current-admin-info',
    method: 'GET',
  })
}

export const updateAdminInfoAPI = (data: UpdataAdmin): Promise<null> => {
  return request({
    url: '/admin',
    method: 'PUT',
    data: data,
  })
}

/**
 * admin有关数据类型
 */
export type AdminInfo = {
  id: number
  username: string
  name: string
  role: string
  avatar: string
  email: string
  qqNumber: string
  address: string
  githubUrl: string
  bilibiliUrl: string
  giteeUrl: string
}

export type AdminState = {
  token: string
  adminInfo: AdminInfo
  loginAdminInfo: AdminInfo
}

export type LoginForm = {
  username: string
  password: string
}

export type LoginFormErrors = {
  username?: string
  password?: string
}

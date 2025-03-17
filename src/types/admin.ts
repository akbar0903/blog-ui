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
  adminInfo: AdminInfo | null
  loginAdminInfo: AdminInfo | null
}

export type LoginForm = {
  username: string
  password: string
}

export type LoginFormErrors = {
  username?: string
  password?: string
}

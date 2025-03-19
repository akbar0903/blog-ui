/**
 * 后端返回数据类型
 */
export type ApiResponse<T> = {
  code: number
  msg: string
  data: T
}

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

/**
 * 首页统计卡片数据类型
 */
export type StatisticsData = {
  articleCount: number
  categoryCount: number
  tagCount: number
  imageCount: number
}

/**
 * 文章数据类型
 */
export type ArticleData = {
  id: number
  title: string
  summary: string
  content: string
  coverImage: string
  state: number
  categoryName: string
  tagNames: string[]
  createdTime: string
  updatedTime: string
}

export type ArticlePageParams = {
  pageNum?: number
  pageSize?: number
  categoryId?: number
  state?: number
  title?: string
}

export type PageResult = {
  rows: ArticleData[]
  total: number
}

/**
 * 文章分类类型
 */
export type Category = {
  id: number
  name: string
  adminId: number
  createdTime: string
  updatedTime: string
}

/**
 * token操作工具方法
 */
const TOKEN_KEY = 'token_key'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

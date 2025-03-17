import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { AdminState, ApiResponse, LoginForm } from '@/types'
import { request, setToken as _setToken, getToken } from '@/utils/index.ts'

// 初始状态
const initialState: AdminState = {
  token: getToken() || '',
  adminInfo: null,
  loginAdminInfo: null,
}

// 定义slice
const adminStore = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      // 保存到localstorage
      _setToken(action.payload)
    },
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload
    },
    setLoginAdminInfo: (state, action) => {
      state.loginAdminInfo = action.payload
    },
  },
})

export const { setToken, setAdminInfo, setLoginAdminInfo } = adminStore.actions

// 异步登录获取token
export const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: Dispatch) => {
    const response: ApiResponse = await request.post('/admin/login', loginForm)
    if (response.code === 0) {
      throw new Error(response.msg)
    }
    if (response.data) {
      dispatch(setToken(response.data))
    }
    return response.data
  }
}

// 异步获取用户信息
export const fetchLoginAdminInfo = () => {
  return async (dispatch: Dispatch) => {
    const response: ApiResponse = await request.get('/admin/current-admin-info')
    if (response.code === 0) {
      throw new Error(response.msg)
    }
    if (response.data) {
      dispatch(setLoginAdminInfo(response.data))
    }
    return response.data
  }
}

// 导出 reducer，最终会加入到 store 中
export default adminStore.reducer

import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { AdminState, LoginForm } from '@/types'
import { setToken as _setToken, getToken, removeToken } from '@/utils/index.ts'
import { loginAPI, getLoginInfoAPI } from '@/apis/admin'

// 初始状态
const initialState: AdminState = {
  token: getToken() || '',
  adminInfo: {
    id: 0,
    username: '',
    name: '',
    role: '',
    avatar: '',
    email: '',
    qqNumber: '',
    address: '',
    githubUrl: '',
    bilibiliUrl: '',
    giteeUrl: '',
  },
  loginAdminInfo: {
    id: 0,
    username: '',
    name: '',
    role: '',
    avatar: '',
    email: '',
    qqNumber: '',
    address: '',
    githubUrl: '',
    bilibiliUrl: '',
    giteeUrl: '',
  },
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
    clearToken: (state) => {
      state.token = ''
      removeToken()
    },
    clearLoginAdminInfo: (state) => {
      state.loginAdminInfo = {
        ...state.loginAdminInfo,
      }
    },
  },
})

export const { setToken, setAdminInfo, setLoginAdminInfo, clearLoginAdminInfo, clearToken } =
  adminStore.actions

// 异步登录获取token
export const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: Dispatch) => {
    const data = await loginAPI(loginForm)
    dispatch(setToken(data))
    return data
  }
}

// 异步获取用户信息
export const fetchLoginAdminInfo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await getLoginInfoAPI()
      dispatch(setLoginAdminInfo(data))
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
    }
  }
}

// 导出 reducer，最终会加入到 store 中
export default adminStore.reducer

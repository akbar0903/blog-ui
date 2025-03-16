import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '@/store/modules/admin.ts'

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
})

// 这是 store.dispatch 的类型，自动支持 Redux Toolkit 的 thunk action。
export type AppDispatch = typeof store.dispatch

export default store

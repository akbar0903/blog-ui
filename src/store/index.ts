import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '@/store/modules/admin.ts'

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
})

// 用dispatch类型定义
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store

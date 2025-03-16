import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { addToast } from '@heroui/react'

/**
 * 路由守卫高阶组件
 * @param children
 * @constructor
 */
type AuthRouteProps = {
  children: ReactNode
}
export default function AuthRoute({ children }: AuthRouteProps) {
  const token = getToken()
  if (token) {
    // 有token经常访问
    return <>{children}</>
  } else {
    // 没有token重定向到登录页
    addToast({ title: '请先登录', color: 'warning' })
    return <Navigate to={'/login'} replace />
  }
}

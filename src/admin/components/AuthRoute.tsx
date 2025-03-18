import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { fetchLoginAdminInfo } from '@/store/modules/admin.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { AxiosError } from 'axios'
import { Spinner } from '@heroui/react'

/**
 * 路由守卫高阶组件
 * @param children
 * @constructor
 */
type AuthRouteProps = {
  children: ReactNode
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null) // null: 验证中, true: 有效, false: 无效
  const dispatch = useDispatch<AppDispatch>()
  const token = getToken()

  // 异步验证 token
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false) // 无 token，直接无效
        return
      }
      try {
        // 向后端发送请求验证 token
        await dispatch(fetchLoginAdminInfo())
        setIsValid(true) // 请求成功，token 有效
      } catch (error) {
        // 如果返回 401 或其他错误，token 无效
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 401) {
          setIsValid(false)
        } else {
          console.error('身份验证失败', error)
          setIsValid(false)
        }
      }
    }
    validateToken()
  }, [dispatch, token])

  // 验证中的加载状态
  if (isValid === null) {
    return (
      <Spinner variant="wave" className="min-h-screen flex items-center justify-center"></Spinner>
    )
  }

  // token 有效，渲染后台页面
  if (isValid) {
    return <>{children}</>
  }

  // token 无效，跳转到登录页
  return <Navigate to={'/login'} replace />
}

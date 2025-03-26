import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '@/utils' // 假设 getToken 获取 token，request 是你的请求工具
import { ReactNode } from 'react'
import { getLoginInfoAPI } from '@/apis/admin.ts'
import { AxiosError } from 'axios'
import { Spinner } from '@heroui/react'

/**
 * 在有token的情况下直接重定向到后台首页
 *
 */
type LoginRouteProps = {
  children: ReactNode
}

export default function LoginRoute({ children }: LoginRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const token = getToken()

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false)
        return
      }
      try {
        // 异步请求后端验证 token
        await getLoginInfoAPI()
        setIsValid(true) // token 有效，重定向到 /admin
      } catch (error) {
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
  }, [token])

  // 验证过程中的加载状态
  if (isValid === null) {
    return (
      <Spinner variant="wave" className="min-h-screen flex items-center justify-center"></Spinner>
    )
  }

  // token 有效时重定向到 /admin
  if (isValid) {
    return <Navigate to="/admin" replace />
  }

  // token 无效或不存在时渲染登录页面
  return <>{children}</>
}

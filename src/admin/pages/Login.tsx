import { addToast, Button, Card, CardBody, CardHeader, Form, Input } from '@heroui/react'
import ThemeToggle from '@/front/components/ThemeToggle.tsx'
import { FormEvent, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/admin.ts'
import { LoginForm, LoginFormErrors } from '@/types'
import { AppDispatch } from '@/store'
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from '@/message/message.ts'

export default function Login() {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // 校验数据并校验
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 获取表单数据并转换为对象
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as LoginForm

    // 重置错误状态
    setErrors({})

    // 验证表单
    const newErrors: LoginFormErrors = {}
    if (!data.username) {
      newErrors.username = ERROR_MESSAGES.USERNAME_EMPTY
    }
    if (!data.password) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_EMPTY
    } else if (data.password.length < 6) {
      newErrors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await dispatch(fetchLogin(data))
      addToast({ title: SUCCESS_MESSAGE.LOGIN_SUCCESS, color: 'success' })
      navigate('/admin')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      addToast({ title: ERROR_MESSAGES.LOGIN_ERROR, description: errorMessage, color: 'danger' })
      setErrors({ username: '' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto w-full p-6 m-4 relative">
        <div className="flex items-center justify-between">
          <Button isIconOnly variant="light" onPress={() => navigate('/')}>
            <IoArrowBack className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
        <CardHeader className="justify-center relative">
          <h1 className="text-3xl font-semibold">Log In👋</h1>
        </CardHeader>
        <CardBody>
          <Form
            className="w-full flex flex-col gap-4"
            autoComplete="on"
            validationErrors={errors}
            onSubmit={onSubmit}
          >
            <Input
              label="用户名"
              name="username"
              labelPlacement="outside"
              variant="bordered"
              placeholder="请输入用户名"
              type="text"
            />
            <Input
              label="密码"
              name="password"
              labelPlacement="outside"
              variant="bordered"
              placeholder="请输入密码"
              type="text"
            />
            <Button fullWidth color="primary" type="submit">
              登录
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

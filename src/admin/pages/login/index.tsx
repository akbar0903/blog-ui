import { addToast, Button, Card, CardBody, CardHeader, Form, Input } from '@heroui/react'
import ThemeToggle from '@/front/components/ThemeToggle.tsx'
import { ChangeEvent, FormEvent, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/admin.ts'
import { LoginForm } from '@/types'
import { AppDispatch } from '@/store'
import PasswordInput from '@/admin/components/PasswordInput'

export default function Login() {
  const [data, setData] = useState<LoginForm>({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // 处理输入框事件
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  // 提交数据
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data.username || !data.password) {
      addToast({ title: '请填写所有字段', color: 'warning', timeout: 3000 })
      return
    } else if (data.password.length < 6) {
      addToast({ title: '密码至少大于6个字符', color: 'warning', timeout: 3000 })
      return
    }

    try {
      setIsLoading(true)
      await dispatch(fetchLogin(data))
      addToast({ title: '登录成功', color: 'success' })
      navigate('/admin')
    } catch (error) {
      if (error instanceof Error) {
        addToast({ title: '登录失败', description: error.message, color: 'danger', timeout: 3000 })
      }
    } finally {
      setIsLoading(false)
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
          <Form className="w-full flex flex-col gap-4" autoComplete="on" onSubmit={onSubmit}>
            <Input
              label="用户名"
              name="username"
              labelPlacement="outside"
              placeholder="请输入用户名"
              type="text"
              value={data.username}
              onChange={handleInputChange}
            />
            <PasswordInput
              label="密码"
              placeholder="请输入密码"
              name="password"
              labelPlacement="outside"
              value={data.password}
              onChange={handleInputChange}
            />
            <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
              登录
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

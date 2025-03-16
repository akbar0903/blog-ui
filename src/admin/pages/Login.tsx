import { Button, Card, CardBody, CardHeader, Input, Link } from '@heroui/react'
import ThemeToggle from '@/front/components/ThemeToggle.tsx'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto w-full p-6 m-4 relative">
        <div className="absolute top-2 right-2 flex items-center justify-center">
          <ThemeToggle />
        </div>
        <CardHeader className="justify-center relative">
          <h1 className="mb-2 text-3xl font-semibold">Log In👋</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <Input
            label="用户名"
            labelPlacement="outside"
            variant="bordered"
            placeholder="请输入用户名"
            type="text"
          />
          <Input
            label="密码"
            labelPlacement="outside"
            variant="bordered"
            placeholder="请输入密码"
            type="text"
          />
          <Button as={Link} href="/admin" color="primary">
            登录
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

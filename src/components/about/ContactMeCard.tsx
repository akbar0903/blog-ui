import { Button, Card, CardBody, CardHeader, Link, Input, Textarea } from '@heroui/react'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { LuGithub } from 'react-icons/lu'
import { FaBilibili } from 'react-icons/fa6'
import { SiGitee } from 'react-icons/si'
import { CiLocationArrow1 } from 'react-icons/ci'

export default function ContactMeCard() {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
      <Card fullWidth={true} className="border-l-4 border-l-blue-500">
        <CardHeader className="flex items-center gap-3 p-4">
          <p className="text-xl font-bold">联系方式</p>
        </CardHeader>
        <CardBody className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
              <MdOutlineMailOutline className="w-5 h-5 text-blue-500" />
            </span>
            <div>
              <p className="text-small text-gray-600 dark:text-gray-400">邮箱</p>
              <p className="font-medium">akbar4857qq.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
              <MdOutlineMailOutline className="w-5 h-5 text-blue-500" />
            </span>
            <div>
              <p className="text-small text-gray-600 dark:text-gray-400">邮箱</p>
              <p className="font-medium">aike13209034857@163.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
              <FiMapPin className="w-5 h-5 text-blue-500" />
            </span>
            <div>
              <p className="text-small text-gray-600 dark:text-gray-400">地址</p>
              <p className="font-medium">新疆，和田县</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-2">
            <Button as={Link} isIconOnly href="#" color="primary" radius="full" size="lg">
              <LuGithub className="w-5 h-5 text-white" />
            </Button>
            <Button as={Link} isIconOnly href="#" color="primary" radius="full" size="lg">
              <FaBilibili className="w-5 h-5 text-white" />
            </Button>
            <Button as={Link} isIconOnly href="#" color="primary" radius="full" size="lg">
              <SiGitee className="w-5 h-5 text-white" />
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card fullWidth={true} className="border-l-4 border-l-blue-500">
        <CardHeader className="flex items-center gap-3 p-4">
          <p className="text-xl font-bold">发送消息</p>
        </CardHeader>
        <CardBody className="p-4 flex-wrap flex-col gap-4">
          <Input
            label="电子邮箱"
            labelPlacement="outside"
            placeholder="请输入您的电子邮箱"
            type="email"
          />
          <Textarea
            className="w-full"
            label="您的留言"
            labelPlacement="outside"
            placeholder="请输入您的留言..."
          />
          <div className="flex items-center justify-center mt-3">
            <Button color="primary" className="w-full">
              <CiLocationArrow1 className="w-5 h-5" />
              发送消息
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

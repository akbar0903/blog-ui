import { Card, CardBody, Image } from '@heroui/react'
import { FaBilibili } from 'react-icons/fa6'
import { LuGithub } from 'react-icons/lu'
import { SiGitee } from 'react-icons/si'
import mofeiImage from '@/assets/Mofei1-cut.jpg'

export default function ProfileCard() {
  return (
    <Card className="overflow-hidden">
      <CardBody className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full overflow-hidden relative mb-4">
            <Image src={mofeiImage} alt="Author" className="object-cover" />
          </div>
          <h2 className="text-xl font-semibold mb-2">John Doe</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Frontend developer passionate about creating beautiful and functional web experiences.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
            >
              <FaBilibili className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
            >
              <LuGithub className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
            >
              <SiGitee className="w-5 h-5" />
            </a>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

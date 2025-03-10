import { Card, CardBody, CardHeader } from '@heroui/react'
import { ReactNode } from 'react'

type Props = {
  bgStyle: string,
  icon: ReactNode
  title: string,
  description: string,
  className?: string
}

export default function HobbyCard({icon ,bgStyle = 'from-purple-400 to-pink-500', title,description, className }: Props) {
  return (
    <Card isHoverable={true} className={className}>
      <CardHeader className={`flex items-center justify-center p-4 h-32 bg-gradient-to-r ${bgStyle}`}>
        {icon}
      </CardHeader>
      <CardBody className="p-6">
        <p className="text-xl font-bold mb-2">{ title}</p>
        <p className="text-gray-600 dark:text-gray-400">
         { description }
        </p>
      </CardBody>
    </Card>
  )
}

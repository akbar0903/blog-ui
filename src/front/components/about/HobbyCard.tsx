import { Card, CardBody, CardHeader } from '@heroui/react'
import { ReactNode } from 'react'

type Props = {
  bgStyle: string
  icon: ReactNode
  title: string
}

export default function HobbyCard({ icon, bgStyle = 'from-purple-400 to-pink-500', title }: Props) {
  return (
    <Card isHoverable={true}>
      <CardHeader
        className={`flex items-center justify-center p-4 h-32 bg-gradient-to-r ${bgStyle}`}
      >
        {icon}
      </CardHeader>
      <CardBody className="p-6 items-center">
        <p className="text-xl font-bold mb-2">{title}</p>
      </CardBody>
    </Card>
  )
}

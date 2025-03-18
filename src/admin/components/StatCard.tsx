import { ReactNode } from 'react'
import { Card, CardBody } from '@heroui/react'

type StatCardProps = {
  className?: string
  title: string
  number?: number
  icon: ReactNode
}

export default function StatCard({ className, title, number, icon }: StatCardProps) {
  return (
    <Card fullWidth>
      <CardBody className="p-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${className} text-white`}>{icon}</div>
          <div className="mx-5">
            <h4 className="text-2xl font-semibold">{number}</h4>
            <div>{title}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

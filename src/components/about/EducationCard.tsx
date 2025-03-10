import { Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  major: string
  school: string
  start: string
  end: string
  description: string
  courses: string[]
}

export default function EducationCard({
  icon,
  major,
  school,
  start,
  end,
  description,
  courses,
}: Props) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20">
        {icon}
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{major}</p>
          <p className="text-small text-gray-600 dark:text-gray-400">
            {school} | {start} - {end}
          </p>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {courses.map((course, index) => (
            <Chip key={`${course}-${index}`} color="primary" variant="flat">
              {course}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

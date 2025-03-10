import { Button, Card, CardBody, CardHeader, Chip, Link } from '@heroui/react'
import { LuBriefcase } from 'react-icons/lu'

type Props = {
  projectName: string
  projectDescription: string
  projectLink?: string
  projectChip: string[]
}

export default function ProjectCard({
  projectName,
  projectDescription,
  projectLink,
  projectChip,
}: Props) {
  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader className="flex justify-between p-4 bg-amber-50 dark:bg-amber-900/20">
        <div className="flex items-center gap-2">
          <LuBriefcase className="h-8 w-8 text-amber-500" />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">{projectName}</p>
            <p className="text-small text-gray-600 dark:text-gray-400">
              前后端 | 2024年
            </p>
          </div>
        </div>
        {projectLink && (
          <Button as={Link} color="warning" showAnchorIcon href={projectLink}>
            项目链接
          </Button>
        )}
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {projectDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {projectChip.map((chip, index) => (
            <Chip key={`${chip}-${index}`} color="warning" variant="flat">
              {chip}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

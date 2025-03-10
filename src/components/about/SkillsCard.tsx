import { Card, CardBody, CardHeader, Progress } from '@heroui/react'
import { IoCode } from 'react-icons/io5'

type SkillsAndLevel = {
  skill: string 
  level: number
}

type Props = {
  title: string 
  skills: SkillsAndLevel[]
}

export default function SkillsCard({title, skills}: Props) {
  return (
    <Card fullWidth className="border-l-4 border-l-green-500">
      <CardHeader className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 pb-2">
        <IoCode className="h-8 w-8 text-green-500" />
        <p className="text-xl font-bold">{title}</p>
      </CardHeader>
      <CardBody className="p-4">
        {skills.map((skillItem, index) => (
          <Progress
            key={`${skillItem.skill}-${index}`}
            aria-label={`Progress for ${skillItem.skill}`}
            label={skillItem.skill}
            color="success"
            showValueLabel={true}
            size="md"
            value={skillItem.level}
            className="max-w-full mb-4"
          />
        ))}
      </CardBody>
    </Card>
  )
}

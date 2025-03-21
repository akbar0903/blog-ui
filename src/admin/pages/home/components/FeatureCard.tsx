import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { GoXCircle } from 'react-icons/go'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

interface FeatureCardProps {
  isCompleted: number
  title: string
  description: string
  completedTime: string
  createdTime: string
  onEdit?: () => void
  onDelete: () => void
  onToggleComplete?: () => void
}

export default function FeatureCard(props: FeatureCardProps) {
  const {
    isCompleted,
    title,
    description,
    completedTime,
    createdTime,
    onEdit,
    onDelete,
    onToggleComplete,
  } = props

  return (
    <Card className="relative overflow p-2">
      {isCompleted === 1 && (
        <div className="absolute top-2 right-2 pointer-events-none">
          <div className="rotate-[-20deg] border-4 border-green-600 rounded-full w-20 h-20 flex items-center justify-center opacity-20">
            <span className="text-green-600 text-lg font-bold">已完成</span>
          </div>
        </div>
      )}

      <CardHeader className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold text-foreground-600">{title}</h3>
        <div className="text-sm text-foreground-500">创建于: {createdTime}</div>
        {isCompleted === 1 && completedTime && (
          <div className="text-sm text-green-600 font-medium">完成于: {completedTime}</div>
        )}
      </CardHeader>

      <CardBody className="pt-1">
        <p
          className="text-sm line-clamp-3 cursor-pointer hover:text-primary transition-colors"
          title="点击查看完整描述"
        >
          {description}
        </p>
      </CardBody>

      <CardFooter className="pt-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <Button color="primary" variant="flat" size="sm" onPress={onEdit}>
            <FaRegEdit className="h-4 w-4 mr-1" />
            修改
          </Button>
          <Button color="danger" variant="flat" size="sm" onPress={onDelete}>
            <FaTrash className="h-4 w-4 mr-1" />
            删除
          </Button>
        </div>

        <Button
          variant={isCompleted === 1 ? 'flat' : 'faded'}
          size="sm"
          color={isCompleted === 1 ? 'warning' : 'success'}
          onPress={onToggleComplete}
        >
          {isCompleted === 1 ? (
            <>
              <GoXCircle className="h-4 w-4 mr-1" />
              标记未完成
            </>
          ) : (
            <>
              <IoIosCheckmarkCircleOutline className="h-4 w-4 mr-1" />
              标记完成
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

import { CategoryType, TagType } from '@/types'
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { ReactNode } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'
import ConfirmPopover from './ConfirmPopover'

interface CategoryTagCardProps {
  data: CategoryType | TagType
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  className?: string
  isHaveDivider?: boolean
  cardIcon?: ReactNode
}

export default function CategoryTagCard(props: CategoryTagCardProps) {
  const { data, onEdit, onDelete, className, isHaveDivider = true, cardIcon } = props

  return (
    <Card className={`py-2 relative group ${className}`}>
      <CardHeader className="px-6 flex justify-between">
        <h2 className="text-xl flex items-center gap-2">
          {cardIcon}
          {data.name}
        </h2>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          {/* 修改 */}
          <Button
            color="primary"
            isIconOnly
            variant="flat"
            size="sm"
            onPress={() => onEdit(data.id)}
          >
            <FaRegEdit className="h-4 w-4" />
          </Button>

          {/* 删除 */}
          <ConfirmPopover onConfirm={() => onDelete(data.id)} />
        </div>
      </CardHeader>
      {isHaveDivider && <Divider />}
      <CardBody className="px-6 gap-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GoClock className="h-4 w-4" />
          <span>创建于: {data.createdTime}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GoClock className="h-4 w-4" />
          <span>创建于: {data.updatedTime}</span>
        </div>
      </CardBody>
    </Card>
  )
}

import { Category } from '@/types'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react'
import { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'

interface CategoryCardProps {
  category: Category
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <Card className="py-2 relative group">
      <CardHeader className="px-6 flex justify-between">
        <h2 className="text-xl">
          <span className="text-primary-500 font-bold pr-1">#</span>
          {category.name}
        </h2>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          {/* 修改 */}
          <Button
            color="primary"
            isIconOnly
            variant="flat"
            size="sm"
            onPress={() => onEdit(category.id)}
          >
            <FaRegEdit className="h-4 w-4" />
          </Button>

          {/* 删除 */}
          <Popover isOpen={isPopoverOpen} onOpenChange={(open) => setIsPopoverOpen(open)}>
            <PopoverTrigger>
              <Button color="danger" variant="flat" size="sm" isIconOnly>
                <FaRegTrashAlt className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <h1 className="pb-2">请确认此操作！</h1>
                <div className="flex gap-2">
                  <Button size="sm" color="primary" onPress={() => onDelete(category.id)}>
                    确定
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => setIsPopoverOpen(false)}
                  >
                    取消
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 gap-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GoClock className="h-4 w-4" />
          <span>创建于: {category.createdTime}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GoClock className="h-4 w-4" />
          <span>创建于: {category.updatedTime}</span>
        </div>
      </CardBody>
    </Card>
  )
}

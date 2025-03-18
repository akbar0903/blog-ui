import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { LuCalendarDays, LuTag } from 'react-icons/lu'
import { ArticleData } from '@/types'
import { FaRegEdit, FaTrash } from 'react-icons/fa'

type CardProps = {
  article: ArticleData
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export default function MobileArticleCard({ article }: CardProps) {
  // 获取文章状态
  const getStateLabel = (state: number) => {
    switch (state) {
      case 0:
        return { label: '草稿', className: 'text-white' }
      case 1:
        return { label: '已发布', className: '' }
      default:
        return { label: '未知', className: '' }
    }
  }
  const stateInfo = getStateLabel(article.state)

  return (
    <Card className="overflow-hidden p-0 relative">
      <CardBody className="p-0">
        <Image
          alt={article.title}
          className="w-full object-cover h-[140px]"
          radius="none"
          shadow="sm"
          src={article.coverImage}
          width="100%"
        />
        <div className="absolute top-2 right-2 z-50">
          <Chip
            size="sm"
            color={stateInfo.label === '已发布' ? 'primary' : 'warning'}
            className={stateInfo.className}
          >
            {stateInfo.label}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-5 pt-4">
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tagNames.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              variant="flat"
              size="sm"
              startContent={<LuTag className="h-3 w-3 mr-[2px]" />}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground text-gray-600 dark:text-gray-400">
          <LuCalendarDays />
          <span>创建: {article.createdTime}</span>
          <span className="mx-2">|</span>
          <LuCalendarDays />
          <span>更新: {article.updatedTime}</span>
        </div>
        <div className="flex w-full justify-between mt-2">
          <Button size="sm" startContent={<FaRegEdit className="h-3 w-3 mr-[2px]" />}>
            编辑
          </Button>
          <Button size="sm" color="danger" startContent={<FaTrash className="h-3 w-3 mr-[2px]" />}>
            删除
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

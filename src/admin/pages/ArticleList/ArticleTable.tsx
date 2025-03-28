import { ArticleData } from '@/types'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Image,
  ChipProps,
  Button,
} from '@heroui/react'
import { Key, useCallback } from 'react'
import { BsBook } from 'react-icons/bs'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// 表格列
const columns = [
  { label: '标题', id: 'title' },
  { name: '封面', id: 'coverImage' },
  { name: '状态', id: 'state' },
  { name: '分类', id: 'categoryName' },
  { name: '标签', id: 'tagNames' },
  { name: '创建时间', id: 'createdTime' },
  { name: '更新时间', id: 'updatedTime' },
  { name: '操作', id: 'actions' },
]

// 文章发布状态颜色
const stateColorMap: Record<string, ChipProps['color']> = {
  1: 'success',
  0: 'warning',
}

interface ArticleTableProps {
  articles: ArticleData[]
}

export default function ArticleTable({ articles }: ArticleTableProps) {
  const navigate = useNavigate()

  // 表格单元格渲染
  const renderCell = useCallback((article: ArticleData, columnKey: Key) => {
    if (!article) return null

    switch (columnKey) {
      case 'coverImage':
        return (
          <Image
            src={article.coverImage}
            alt={article.title}
            width={80}
            height={80}
            className="object-cover"
          />
        )
      case 'title':
        return <p className="text-medium text-nowrap">{article.title}</p>
      case 'state':
        return (
          <Chip color={stateColorMap[article.state]} size="sm" variant="flat">
            {article.state === 1 ? '已发布' : '草稿'}
          </Chip>
        )
      case 'categoryName':
        return <p className="text-nowrap md:text-wrap">{article.categoryName}</p>
      case 'tagNames':
        return (
          <div className="flex flex-nowrap md:flex-wrap gap-1">
            {article.tagNames.map((tag, index) => (
              <Chip key={`${tag}-${index}`} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        )
      case 'createdTime':
        return <p className="text-nowrap md:text-wrap">{article.createdTime}</p>
      case 'updatedTime':
        return <p className="text-nowrap md:text-wrap">{article.updatedTime}</p>
      case 'actions':
        return (
          <div className="relative flex items-center">
            <Tooltip content="预览">
              <Button
                variant="light"
                size="sm"
                isIconOnly
                onPress={() => navigate(`/admin/article-preview/${article.id}`)}
              >
                <BsBook className="w-4 h-4 text-default-400" />
              </Button>
            </Tooltip>
            <Tooltip content="编辑">
              <Button variant="light" isIconOnly size="sm">
                <FaRegEdit className="w-4 h-4 text-default-400" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <Button isIconOnly color="danger" variant="light" size="sm">
                <FaRegTrashAlt className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        )
    }
  }, [])

  return (
    <Table removeWrapper className="mt-4" aria-label="文章列表">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            className="text-sm"
            key={column.id}
            align={column.id === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={articles} emptyContent={<p>No Data!</p>}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

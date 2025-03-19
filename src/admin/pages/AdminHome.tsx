import StatCard from '@/admin/components/StatCard.tsx'
import { LuBook, LuTag } from 'react-icons/lu'
import { MdOutlineCategory } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'
import { Key, ReactNode, useCallback, useEffect, useState } from 'react'
import { statisticsAPI } from '@/apis/statistics.ts'
import { ApiResponse, ArticleData, StatisticsData, PageResult } from '@/types'
import { ERROR_MESSAGES } from '@/message/message.ts'
import { getArticleListAPI } from '@/apis/article.ts'
import {
  Chip,
  ChipProps,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@heroui/react'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { BsBook } from 'react-icons/bs'

type StatCard = {
  title: string
  field: string
  icon: ReactNode
  bgColor: string
  number?: number
}

const statCardsConfig = [
  {
    title: '总文章',
    field: 'articleCount',
    icon: <LuBook className="h-6 w-6" />,
    bgColor: 'bg-primary',
  },
  {
    title: '总分类',
    field: 'categoryCount',
    icon: <MdOutlineCategory className="h-6 w-6" />,
    bgColor: 'bg-secondary',
  },
  {
    title: '总标签',
    field: 'tagCount',
    icon: <LuTag className="h-6 w-6" />,
    bgColor: 'bg-success',
  },
  {
    title: '总文件',
    field: 'imageCount',
    icon: <GoFileDirectory className="h-6 w-6" />,
    bgColor: 'bg-warning',
  },
]

const columns = [
  { name: '标题', uid: 'title' },
  { name: '封面', uid: 'coverImage' },
  { name: '状态', uid: 'state' },
  { name: '分类', uid: 'categoryName' },
  { name: '标签', uid: 'tagNames' },
  { name: '创建时间', uid: 'createdTime' },
  { name: '更新时间', uid: 'updatedTime' },
  { name: '操作', uid: 'actions' },
]

const stateColorMap: Record<string, ChipProps['color']> = {
  1: 'success',
  0: 'warning',
}

export default function AdminHome() {
  const [statCards, setStatCards] = useState<StatCard[]>(statCardsConfig)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(5)

  // 获取卡片信息
  const fetchCardDate = async () => {
    try {
      const response: ApiResponse<StatisticsData> = await statisticsAPI()
      if (response.code === 1) {
        const updateCards = statCardsConfig.map(card => ({
          ...card,
          number: response.data[card.field as keyof StatisticsData] || 0,
        }))
        setStatCards(updateCards)
      } else {
        throw new Error(response.msg || ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    }
  }

  // 获取文章信息
  const fetchArticleData = async () => {
    try {
      const response: ApiResponse<PageResult> = await getArticleListAPI({
        pageNum: currentPage,
        pageSize: pageSize,
      })
      if (response.code === 1) {
        setArticles(response.data.rows)
        setTotal(response.data.total)
      } else {
        throw new Error(response.msg || ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    }
  }

  // 表格渲染函数
  const renderCell = useCallback((article: ArticleData, columnKey: Key) => {
    if (!article) return null

    switch (columnKey) {
      case 'coverImage':
        return <Image src={article.coverImage} alt={article.title} width={80} height={80} />
      case 'title':
        return <p className="font-bold">{article.title}</p>
      case 'state':
        return (
          <Chip color={stateColorMap[article.state]} size="sm" variant="flat">
            {article.state === 1 ? '已发布' : '草稿'}
          </Chip>
        )
      case 'categoryName':
        return <p>{article.categoryName}</p>
      case 'tagNames':
        return (
          <div className="flex gap-1 flex-wrap">
            {article.tagNames.map((tag, index) => (
              <Chip key={index} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        )
      case 'createdTime':
        return <p>{article.createdTime}</p>
      case 'updatedTime':
        return <p>{article.updatedTime}</p>
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="预览">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <BsBook />
              </span>
            </Tooltip>
            <Tooltip content="编辑">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaRegEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        )
    }
  }, [])

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchCardDate()
  }, [])

  useEffect(() => {
    fetchArticleData()
  }, [currentPage])

  return (
    <>
      {/*头部统计信息卡片*/}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => (
          <StatCard
            key={card.bgColor}
            title={card.title}
            number={card.number}
            icon={card.icon}
            className={card.bgColor}
          />
        ))}
      </div>

      {/* 文章列表 */}
      <Table
        className="mt-6"
        bottomContent={
          <div className="flex items-center justify-center">
            <Pagination
              key={total}
              color="primary"
              isCompact
              total={Math.ceil(total / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        }
        aria-label="文章列表"
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              className="text-sm"
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={articles}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

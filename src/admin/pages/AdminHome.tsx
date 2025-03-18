import StatCard from '@/admin/components/StatCard.tsx'
import { LuBook, LuTag } from 'react-icons/lu'
import { MdOutlineCategory } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'
import { ReactNode, useEffect, useState } from 'react'
import { statisticsAPI } from '@/apis/statistics.ts'
import { ApiResponse, ArticleData, StatisticsData, PageResult } from '@/types'
import { ERROR_MESSAGES } from '@/message/message.ts'
import MobileArticleCard from '@/front/components/article/MobileArticleCard.tsx'
import { getArticleListAPI } from '@/apis/article.ts'
import { Pagination } from '@heroui/react'

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

export default function AdminHome() {
  const [statCards, setStatCards] = useState<StatCard[]>(statCardsConfig)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(8)

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
      console.error(error)
    }
  }

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
      console.error(error)
    }
  }

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

      {/*文章列表*/}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        {articles.map(article => (
          <MobileArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* 分页*/}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Pagination
          color="primary"
          total={Math.ceil(total / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          showControls
          siblings={0}
        />
      </div>
    </>
  )
}

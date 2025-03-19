import StatCard from '@/admin/components/StatCard.tsx'
import { LuBook, LuTag } from 'react-icons/lu'
import { MdOutlineCategory } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'
import { ReactNode, useEffect, useState } from 'react'
import { statisticsAPI } from '@/apis/statistics.ts'
import { ApiResponse, StatisticsData } from '@/types'
import { ERROR_MESSAGES } from '@/message/message.ts'
import ArticleTableList from '../components/ArticleTableList'

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

  // 获取卡片信息
  const fetchCardData = async () => {
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

  useEffect(() => {
    fetchCardData()
  }, [])

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
      <ArticleTableList />
    </>
  )
}

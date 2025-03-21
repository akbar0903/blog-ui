import { useEffect, useState } from 'react'
import { LuBook, LuTag } from 'react-icons/lu'
import { MdOutlineCategory } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'
import { statisticsAPI } from '@/apis/statistics.ts'
import { ERROR_MESSAGES } from '@/message/message.ts'
import { Card, CardBody } from '@heroui/react'

const statCardsProperty = [
  {
    title: '总文章',
    icon: <LuBook className="h-6 w-6" />,
    bgColor: 'bg-primary',
    number: 0,
  },
  {
    title: '总分类',
    icon: <MdOutlineCategory className="h-6 w-6" />,
    bgColor: 'bg-secondary',
    number: 0,
  },
  {
    title: '总标签',
    icon: <LuTag className="h-6 w-6" />,
    bgColor: 'bg-success',
    number: 0,
  },
  {
    title: '总文件',
    icon: <GoFileDirectory className="h-6 w-6" />,
    bgColor: 'bg-warning',
    number: 0,
  },
]

export default function StatCards() {
  const [cardNumbers, setCardNumbers] = useState({
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    imageCount: 0,
  })

  // 获取卡片数据
  const fetchCardData = async () => {
    try {
      const response = await statisticsAPI()
      if (response.code === 1) {
        setCardNumbers({
          ...response.data,
        })
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statCardsProperty.map((card) => {
        // 根据 title 为每个 card 设置对应的 number
        let number = 0
        switch (card.title) {
          case '总文章':
            number = cardNumbers.articleCount
            break
          case '总分类':
            number = cardNumbers.categoryCount
            break
          case '总标签':
            number = cardNumbers.tagCount
            break
          case '总文件':
            number = cardNumbers.imageCount
            break
          default:
            break
        }

        return (
          <Card fullWidth>
            <CardBody className="p-4">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.bgColor} text-white`}>{card.icon}</div>
                <div className="mx-5">
                  {/*这里number是最新的number*/}
                  <h4 className="text-2xl font-semibold">{number}</h4>
                  <div>{card.title}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}

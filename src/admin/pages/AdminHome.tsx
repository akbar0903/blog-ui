import StatCard from '@/admin/components/StatCard.tsx'
import { LuBook, LuTag } from 'react-icons/lu'
import { MdOutlineCategory } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'

const statCards = [
  {
    title: '总文章',
    number: 200,
    icon: <LuBook className="h-6 w-6" />,
    bgColor: 'bg-primary',
  },
  {
    title: '总分类',
    number: 200,
    icon: <MdOutlineCategory className="h-6 w-6" />,
    bgColor: 'bg-secondary',
  },
  {
    title: '总标签',
    number: 200,
    icon: <LuTag className="h-6 w-6" />,
    bgColor: 'bg-success',
  },
  {
    title: '总文件',
    number: 200,
    icon: <GoFileDirectory className="h-6 w-6" />,
    bgColor: 'bg-warning',
  },
]

export default function AdminHome() {
  return (
    <>
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
    </>
  )
}

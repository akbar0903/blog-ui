import StatCards from '@/admin/pages/home/components/StatCards.tsx'
import FeatureCardList from './components/FeatureCardList'

export default function Home() {
  return (
    <>
      {/*头部统计信息卡片*/}
      <StatCards />

      {/* 功能列表 */}
      <FeatureCardList />
    </>
  )
}

import StatCards from '@/admin/pages/home/StatCards'
import FeatureCardList from './FeatureCardList'

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

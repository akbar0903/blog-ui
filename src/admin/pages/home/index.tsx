import StatCards from '@/admin/pages/home/StatCards'
import ToDoList from './TodoList'

export default function Home() {
  return (
    <>
      {/*头部统计信息卡片*/}
      <StatCards />

      {/* ToDoList */}
      <div className="max-w-lg mx-auto mt-6">
        <ToDoList />
      </div>
    </>
  )
}

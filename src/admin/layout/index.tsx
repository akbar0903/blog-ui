import Header from '@/admin/layout/Header.tsx'
import MainContent from '@/admin/layout/MainContent.tsx'
import Sidebar from '@/admin/layout/Sidebar.tsx'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-zinc-950">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  )
}

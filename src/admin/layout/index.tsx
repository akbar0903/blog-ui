import Header from '@/admin/layout/Header.tsx'
import MainContent from '@/admin/layout/MainContent.tsx'
import Sidebar from '@/admin/layout/Sidebar.tsx'
import SidebarSmallScreen from '@/admin/layout/SidebarSmallScreen.tsx'
import { useState } from 'react'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-zinc-950">
      <SidebarSmallScreen isOpen={isOpen} onOpenChange={handleToggle} />
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={handleToggle} />
        <MainContent />
      </div>
    </div>
  )
}

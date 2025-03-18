import Header from '@/admin/layout/Header.tsx'
import MainContent from '@/admin/layout/MainContent.tsx'
import Sidebar from '@/admin/layout/Sidebar.tsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true)

  // 管理员名字和角色
  const loginAdminInfo = useSelector((state: RootState) => state.admin.loginAdminInfo)
  const { name, role } = loginAdminInfo

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} data={{ name, role }} />
      <Sidebar isOpen={isOpen} />
      <MainContent isOpen={isOpen} />
    </>
  )
}

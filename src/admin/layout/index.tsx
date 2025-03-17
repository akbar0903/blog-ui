import Header from '@/admin/layout/Header.tsx'
import MainContent from '@/admin/layout/MainContent.tsx'
import Sidebar from '@/admin/layout/Sidebar.tsx'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchLoginAdminInfo } from '@/store/modules/admin.ts'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  // 获取管理员信息
  useEffect(() => {
    dispatch(fetchLoginAdminInfo())
  }, [dispatch])

  // 管理员名字和角色
  const loginAdminInfo = useSelector<RootState>(state => state.admin.loginAdminInfo!)
  const name = loginAdminInfo?.name
  const role = loginAdminInfo?.role

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

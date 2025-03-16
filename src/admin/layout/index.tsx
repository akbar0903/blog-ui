import Header from '@/admin/layout/Header.tsx'
import MainContent from '@/admin/layout/MainContent.tsx'
import Sidebar from '@/admin/layout/Sidebar.tsx'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('sidebar-open') === 'true' || false
  })

  useEffect(() => {
    localStorage.setItem('sidebar-open', isOpen.toString())
  }, [isOpen])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} />
      <MainContent isOpen={isOpen} />
    </>
  )
}

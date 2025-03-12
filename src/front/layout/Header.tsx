import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '@/front/components/ThemeToggle.tsx'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // 监听路由变化，当路由变化时关闭菜单
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const menuItems = [
    { name: '首页', routerName: '/' },
    { name: '关于', routerName: '/about' },
    { name: '后台', routerName: '/admin' },
  ]

  return (
    <Navbar maxWidth="xl" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* logo */}
      <NavbarBrand>
        <Link to="/">
          <p className="text-xl font-bold">
            <span>ak</span>
            {/* <span className="text-blue-500">.tech</span> */}
            <span className="text-blue-500">.blog</span>
          </p>
        </Link>
      </NavbarBrand>

      {/* 大屏幕下的菜单 */}
      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <Link to="/" className="font-bold hover:text-blue-500 transition-colors duration-200">
            首页
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/about"
            className="font-bold hover:text-blue-500 transition-colors duration-200"
          >
            关于
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/admin"
            className="font-bold hover:text-blue-500 transition-colors duration-200"
          >
            后台
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* 小屏幕下显示菜单的按钮 */}
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* 小屏幕下菜单栏 */}
      <NavbarMenu>
        {menuItems.map(item => (
          <NavbarMenuItem key={item.routerName}>
            <Link to={item.routerName} onClick={() => setIsMenuOpen(false)} className="font-bold">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

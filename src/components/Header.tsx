import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const menuItems = [
    { name: '首页', routerName: '' },
    { name: '关于', routerName: 'about' },
    { name: '项目', routerName: 'project' },
    { name: '联系我', routerName: 'contact' },
  ]

  return (
    <Navbar maxWidth="full">
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
            to="/project"
            className="font-bold hover:text-blue-500 transition-colors duration-200"
          >
            项目
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/contact"
            className="font-bold hover:text-blue-500 transition-colors duration-200"
          >
            联系我
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
            <Link to={`/${item.routerName}`} className="font-bold">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

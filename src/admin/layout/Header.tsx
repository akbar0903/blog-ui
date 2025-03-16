import ThemeToggle from '@/front/components/ThemeToggle'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import SidebarSmallScreen from '@/admin/layout/SidebarSmallScreen.tsx'

export default function Header() {
  return (
    <Navbar maxWidth="full" isBlurred={false} className="bg-white dark:bg-zinc-900">
      <NavbarBrand className="flex items-center gap-3">
        <SidebarSmallScreen classname="md:hidden" />
        <h2 className="text-lg">首页</h2>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

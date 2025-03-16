import ThemeToggle from '@/front/components/ThemeToggle'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { HiMenuAlt2 } from 'react-icons/hi'

type HeaderProps = {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <Navbar maxWidth="full" isBlurred={false} className="bg-white dark:bg-zinc-900">
      <NavbarBrand className="flex items-center gap-3">
        <button
          className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 active:scale-95 "
          onClick={toggleSidebar}
        >
          <HiMenuAlt2 className="h-5 w-5" />
        </button>
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

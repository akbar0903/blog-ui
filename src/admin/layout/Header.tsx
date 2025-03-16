import ThemeToggle from '@/front/components/ThemeToggle'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { HiMenuAlt2 } from 'react-icons/hi'

type HeaderProps = {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <Navbar maxWidth="full" isBlurred={false} className="bg-white dark:bg-zinc-900">
      <NavbarBrand className="flex items-center gap-2">
        <span className="font-bold text-xl text-blue-500">SOGOODMAN</span>
        <Button onPress={toggleSidebar} isIconOnly variant="light">
          <HiMenuAlt2 className="h-5 w-5" />
        </Button>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

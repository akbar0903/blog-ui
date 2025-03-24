import ThemeToggle from '@/front/components/ThemeToggle'
import { addToast, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearLoginAdminInfo, clearToken } from '@/store/modules/admin.ts'

type HeaderProps = {
  toggleSidebar: () => void
  data: {
    name: string
    role: string
  }
}

export default function Header(props: HeaderProps) {
  const { data, toggleSidebar } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 退出登录
  const logout = () => {
    dispatch(clearToken())
    dispatch(clearLoginAdminInfo())
    navigate('/login')
    addToast({
      title: 'See you next time, bye bye',
      color: 'success',
      timeout: 3000,
    })
  }

  return (
    <Navbar maxWidth="full" isBlurred={false} className="bg-white dark:bg-zinc-900">
      <NavbarBrand className="flex items-center gap-2">
        <span className="font-bold text-xl text-blue-500">SOGOODMAN</span>
        <Button onPress={toggleSidebar} isIconOnly variant="light">
          <HiMenuAlt2 className="h-5 w-5" />
        </Button>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="hidden md:flex font-bold">
          <span>{data.name}.</span>
          <span className="text-primary">{data.role}</span>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" onPress={logout}>
            <FiLogOut className="h-5 w-5" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { LuTag } from 'react-icons/lu'
import { PiImagesLight } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { BsBook } from 'react-icons/bs'

type SidebarProps = {
  isOpen: boolean
}

const menuItems = [
  {
    label: '首页',
    href: '/admin',
    icon: <AiOutlineHome className="h-4 w-4" />,
  },
  {
    label: '文章',
    href: '/admin/article',
    icon: <BsBook className="h-4 w-4" />,
  },
  {
    label: '分类',
    href: '/admin/category',
    icon: <MdOutlineCategory className="h-4 w-4" />,
  },
  {
    label: '标签',
    href: '/admin/tag',
    icon: <LuTag className="h-4 w-4" />,
  },
  {
    label: '图片',
    href: '/admin/image',
    icon: <PiImagesLight className="h-4 w-4" />,
  },
  {
    label: '账号',
    href: '/admin/account',
    icon: <FaRegUser className="h-4 w-4" />,
  },
]

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`min-h-screen w-40 bg-white dark:bg-zinc-900 fixed top-16 left-0 transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <ul className="pt-2 px-4">
        {menuItems.map((menuItem) => (
          <li className="flex p-3" key={menuItem.href}>
            <NavLink
              to={menuItem.href}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`
              }
            >
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

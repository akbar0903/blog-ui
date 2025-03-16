import { Listbox, ListboxItem } from '@heroui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { LuTag } from 'react-icons/lu'
import { PiImagesLight } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
}

export default function SidebarSmallScreen({ isOpen, onOpenChange }: Props) {
  // 当抽屉打开时，禁止body滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* 遮罩层 */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onOpenChange}
      />

      {/* 抽屉内容 */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-zinc-900 transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 头部 */}
        <div className="h-16 flex items-center px-4">
          <h2 className="text-xl font-bold text-blue-500 dark:text-white">ADMIN</h2>
        </div>

        {/* 菜单列表 */}
        <div className="p-2">
          <Listbox variant="flat" aria-label="small-screen-sidebar">
            <ListboxItem key="home" className="gap-2 p-3" textValue="首页">
              <div className="flex items-center gap-2">
                <AiOutlineHome className="h-4 w-4" />
                <span>首页</span>
              </div>
            </ListboxItem>
            <ListboxItem key="category" className="gap-2 p-3" textValue="分类">
              <div className="flex items-center gap-2">
                <MdOutlineCategory className="h-4 w-4" />
                <span>分类</span>
              </div>
            </ListboxItem>
            <ListboxItem key="tag" className="gap-2 p-3" textValue="标签">
              <div className="flex items-center gap-2">
                <LuTag className="h-4 w-4" />
                <span>标签</span>
              </div>
            </ListboxItem>
            <ListboxItem key="image" className="gap-2 p-3" textValue="图片">
              <div className="flex items-center gap-2">
                <PiImagesLight className="h-4 w-4" />
                <span>图片</span>
              </div>
            </ListboxItem>
            <ListboxItem key="account" className="gap-2 p-3" textValue="账号">
              <div className="flex items-center gap-2">
                <FaRegUser className="h-4 w-4" />
                <span>账号</span>
              </div>
            </ListboxItem>
          </Listbox>
        </div>
      </div>
    </>
  )
}

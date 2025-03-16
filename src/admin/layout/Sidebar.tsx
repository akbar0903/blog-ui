import { Listbox, ListboxItem } from '@heroui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { LuTag } from 'react-icons/lu'
import { PiImagesLight } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className="hidden md:block min-h-screen w-32 bg-white dark:bg-zinc-900">
      {/*sidebar头部logo*/}
      <div className="h-16 flex items-center justify-center">
        <span className="font-bold text-xl text-blue-500 dark:text-white">ADMIN</span>
      </div>

      <Listbox className="p-2" variant="flat" aria-label="sidebar">
        <ListboxItem key="home" className="gap-2 p-3" textValue="首页" href="/admin">
          <div className="flex items-center gap-2">
            <AiOutlineHome className="h-4 w-4" />
            <span>首页</span>
          </div>
        </ListboxItem>
        <ListboxItem key="category" className="gap-2 p-3" textValue="分类" href="/admin/category">
          <div className="flex items-center gap-2">
            <MdOutlineCategory className="h-4 w-4" />
            <span>分类</span>
          </div>
        </ListboxItem>
        <ListboxItem key="tag" className="gap-2 p-3" textValue="标签" href="/admin/tag">
          <div className="flex items-center gap-2">
            <LuTag className="h-4 w-4" />
            <span>标签</span>
          </div>
        </ListboxItem>
        <ListboxItem key="image" className="gap-2 p-3" textValue="图片" href="/admin/image">
          <div className="flex items-center gap-2">
            <PiImagesLight className="h-4 w-4" />
            <span>图片</span>
          </div>
        </ListboxItem>
        <ListboxItem key="account" className="gap-2 p-3" textValue="账号" href="/admin/account">
          <div className="flex items-center gap-2">
            <FaRegUser className="h-4 w-4" />
            <span>账号</span>
          </div>
        </ListboxItem>
      </Listbox>
    </div>
  )
}

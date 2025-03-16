import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Listbox,
  ListboxItem,
  useDisclosure,
} from '@heroui/react'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { LuTag } from 'react-icons/lu'
import { PiImagesLight } from 'react-icons/pi'
import { FaRegUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'

type Props = {
  classname?: string
}

export default function SidebarSmallScreen({ classname }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={classname}>
      <Button onPress={onOpen} isIconOnly variant="light">
        <HiMenuAlt2 className="h-5 w-5" />
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" radius="none" size="xs">
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader>Drawer Title</DrawerHeader>
              <DrawerBody>
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
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

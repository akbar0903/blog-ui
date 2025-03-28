import { useState } from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { FaRegTrashAlt } from 'react-icons/fa'

interface ConfirmPopoverProps {
  onConfirm: () => void
  isArticleDelete?: boolean
}

export default function ConfirmPopover(props: ConfirmPopoverProps) {
  const { onConfirm, isArticleDelete = false } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* 触发器部分，点击后弹出确认弹窗 */}
      <PopoverTrigger>
        <Button color="danger" variant={isArticleDelete ? 'light' : 'flat'} size="sm" isIconOnly>
          <FaRegTrashAlt className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      {/* 弹窗内容部分 */}
      <PopoverContent>
        <div className="px-1 py-2">
          <h1 className="pb-2">请确认此操作！</h1>
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              onPress={() => {
                onConfirm()
                setIsOpen(false)
              }}
            >
              确定
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={() => {
                setIsOpen(false)
              }}
            >
              取消
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

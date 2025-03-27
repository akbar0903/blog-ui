import TagCard from '@/admin/components/CategoryTagCard'
import { addTagAPI, deleteTagAPI, getTagInfoAPI, getTagListAPI, updateTagAPI } from '@/apis/tag'
import { TagType } from '@/types'
import { handleAPIRequest } from '@/utils'
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { LuTag } from 'react-icons/lu'

const TAG_COLORS = [
  'bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50',
  'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50',
  'bg-green-100 text-green-800 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/50',
  'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800/50',
  'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50',
  'bg-pink-100 text-pink-800 border border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/50',
  'bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/50',
  'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/50',
]

export default function TagList() {
  const [tags, setTags] = useState<TagType[]>([])
  const [editTag, setEditTag] = useState<Partial<TagType>>({})

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  // 获取标签信息
  const fetchTagData = async () => {
    try {
      const data = await getTagListAPI()
      setTags(data)
    } catch (error) {
      console.error(error instanceof Error ? error.message : '未知错误')
    }
  }
  useEffect(() => {
    fetchTagData()
  }, [])

  // 打开编辑对话框，回显标签信息
  const openEditModel = async (id: number) => {
    try {
      const data = await getTagInfoAPI(id)
      setEditTag(data)
      onOpen()
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '操作失败',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  // 打开添加对话框
  const openAddModal = () => {
    setEditTag({ name: '' })
    onOpen()
  }

  // 提交逻辑
  const handleSubmit = async () => {
    if (!editTag.name?.trim()) {
      addToast({
        title: '请填写标签名称',
        color: 'warning',
        timeout: 3000,
      })
      return
    }
    if (editTag.name.length > 20) {
      addToast({
        title: '标签名称不能超过20个字符',
        color: 'warning',
        timeout: 3000,
      })
      return
    }

    try {
      if (editTag.id) {
        // 更新操作
        await updateTagAPI(editTag.id, editTag.name as string)
        addToast({ title: '修改成功', color: 'success', timeout: 3000 })
      } else {
        // 添加操作
        await addTagAPI(editTag.name as string)
        addToast({ title: '添加成功', color: 'success', timeout: 3000 })
      }
      fetchTagData()
      setEditTag({})
      onClose()
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '操作失败',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  // 删除标签
  const handleDelete = async (id: number) => {
    handleAPIRequest(() => deleteTagAPI(id), '删除成功', fetchTagData)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button color="primary" onPress={openAddModal}>
          添加标签
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tags.map((tag) => (
          <TagCard
            key={tag.id}
            data={tag}
            isHaveDivider={false}
            cardIcon={<LuTag className="h-4 w-4" />}
            className={TAG_COLORS[tag.id % TAG_COLORS.length]}
            onEdit={openEditModel}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{editTag?.id ? '修改标签' : '添加标签'}</ModalHeader>
              <ModalBody>
                <Input
                  value={editTag?.name || ''}
                  onChange={(e) => {
                    setEditTag({ ...editTag, name: e.target.value })
                  }}
                  placeholder="请输入标签名称"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  提交
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

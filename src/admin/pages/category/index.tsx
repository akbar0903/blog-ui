import { useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryTagCard'
import { CategoryData } from '@/types'
import {
  addCategoryAPI,
  deleteCategoryAPI,
  getCategoryInfoAPI,
  getCategoryListAPI,
  updateCategoryAPI,
} from '@/apis/category'
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
import { handleAPIRequest } from '@/utils'

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  // 当 editCategory 为 undefined 时，可以理解为未设置状态
  // 当 editCategory 不为 undefined 时，如果存在 id 则表示是更新，否则表示添加
  const [editCategory, setEditCategory] = useState<Partial<CategoryData>>({})

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      const data = await getCategoryListAPI()
      setCategories(data)
    } catch (error) {
      console.error(error instanceof Error ? error.message : '未知错误')
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  // 打开编辑对话框，回显分类信息
  const openEditModel = async (id: number) => {
    try {
      const data = await getCategoryInfoAPI(id)
      setEditCategory(data)
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
    setEditCategory({ name: '' })
    onOpen()
  }

  // 提交逻辑，根据 editCategory 是否含 id 来判断是添加还是更新
  const handleSubmit = async () => {
    if (!editCategory.name?.trim()) {
      addToast({
        title: '请填写分类名称',
        color: 'warning',
        timeout: 3000,
      })
      return
    }
    if (editCategory.name.length > 20) {
      addToast({
        title: '标签名称不能超过20个字符',
        color: 'warning',
        timeout: 3000,
      })
      return
    }

    try {
      if (editCategory.id) {
        // 更新操作
        await updateCategoryAPI(editCategory.id, editCategory.name as string)
        addToast({ title: '修改成功', color: 'success', timeout: 3000 })
      } else {
        // 添加操作
        await addCategoryAPI(editCategory.name as string)
        addToast({ title: '添加成功', color: 'success', timeout: 3000 })
      }
      fetchCategories()
      setEditCategory({})
      onClose()
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '操作失败',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  // 删除分类
  const handleDelete = async (id: number) => {
    handleAPIRequest(() => deleteCategoryAPI(id), '删除成功', fetchCategories)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button color="primary" onPress={openAddModal}>
          添加分类
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            data={category}
            key={category.id}
            onEdit={openEditModel}
            onDelete={handleDelete}
            cardIcon={<span className="text-primary-500 font-bold">#</span>}
          />
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{editCategory?.id ? '修改分类' : '添加分类'}</ModalHeader>
              <ModalBody>
                <Input
                  value={editCategory?.name || ''}
                  onChange={(e) => {
                    setEditCategory({ ...editCategory, name: e.target.value })
                  }}
                  placeholder="请输入分类名称"
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

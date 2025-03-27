import {
  Card,
  CardBody,
  CardHeader,
  CheckboxGroup,
  Input,
  RadioGroup,
  Textarea,
  Image,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  addToast,
} from '@heroui/react'
import CustomRadio from './CustomRadio'
import CustomCheckbox from './CustomCheckbox'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArticleAddType, CategoryType, TagType } from '@/types'
import { getCategoryListAPI } from '@/apis/category'
import { getTagListAPI } from '@/apis/tag'
import ImageWall from '@/admin/components/ImageWall'
import { addArticleAPI } from '@/apis/article'

export default function ArticleAdd() {
  const [articleAddParams, setArticleAddParams] = useState<Partial<ArticleAddType>>({})
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [tags, setTags] = useState<TagType[]>([])

  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // 获取分类列表和标签列表
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await getCategoryListAPI()
        const tagsData = await getTagListAPI()
        setCategories(categoriesData)
        setTags(tagsData)
      } catch (error) {
        console.error(error instanceof Error ? error.message : '未知错误')
      }
    }
    fetchCategoriesAndTags()
  }, [])

  // 处理输入框变化
  const handleChange = (field: keyof ArticleAddType, value: string) => {
    setArticleAddParams((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? value.trim() : value,
    }))
  }

  // 提交文章
  const handleSubmit = async () => {
    try {
      await addArticleAPI(articleAddParams as ArticleAddType)
      addToast({
        title: '文章添加成功',
        color: 'success',
        timeout: 3000,
      })
      navigate('/admin/article-list')
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '未知错误',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  // 监听 articleAddParams 变化，并在 `state` 存在时提交
  useEffect(() => {
    if (articleAddParams.state !== undefined) {
      handleSubmit()
    }
  }, [articleAddParams])

  return (
    <>
      <Card className="py-2">
        <CardHeader className="px-6">
          <div className="flex items-center gap-4">
            <Button isIconOnly variant="light" onPress={() => navigate('/admin/article-list')}>
              <TiArrowBack className="w-6 h-6" />
            </Button>
            <h2 className="text-xl">添加文章</h2>
          </div>
        </CardHeader>
        <CardBody className="px-6 gap-6">
          {/* 标题 */}
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-20">文章标题</span>
            <Input
              placeholder="请输入文章标题"
              value={articleAddParams.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          {/* 内容 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章内容</span>
            <Textarea
              maxRows={28}
              placeholder="请输入文章内容..."
              value={articleAddParams.content}
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </div>

          {/* 摘要 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章摘要</span>
            <Textarea
              placeholder="请输入文章摘要..."
              value={articleAddParams.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
            />
          </div>

          {/* 分类 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章分类</span>
            <RadioGroup
              orientation="horizontal"
              value={String(articleAddParams.categoryId)}
              onValueChange={(key) =>
                setArticleAddParams((prev) => ({
                  ...prev,
                  categoryId: parseInt(key, 10),
                }))
              }
            >
              {categories?.map((category) => (
                <CustomRadio key={category.id} value={String(category.id)}>
                  {category.name}
                </CustomRadio>
              ))}
            </RadioGroup>
          </div>

          {/* 标签 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章标签</span>
            <CheckboxGroup
              orientation="horizontal"
              value={articleAddParams.tagIds?.map(String) || []} // number[] 转 string[]
              onValueChange={(key) =>
                setArticleAddParams((prev) => ({
                  ...prev,
                  tagIds: key.map(Number), // string[] 转 number[]
                }))
              }
            >
              {tags?.map((tag) => (
                <CustomCheckbox key={tag.id} value={String(tag.id)}>
                  {tag.name}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>

          {/* 封面 */}
          <div className="flex gap-4">
            <span className="text-nowrap w-20">文章封面</span>
            <div className="flex flex-col gap-4 relative">
              <div
                className={`${articleAddParams.coverImage ? '' : 'border-2 border-dashed rounded-[13px]'}`}
              >
                <Image
                  src={articleAddParams.coverImage}
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
              <Button color="primary" onPress={onOpen}>
                选择封面
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-6">
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                setArticleAddParams((prev) => ({
                  ...prev,
                  state: 0,
                }))
              }}
            >
              存为草稿
            </Button>
            <Button
              color="primary"
              onPress={() => {
                setArticleAddParams((prev) => ({
                  ...prev,
                  state: 1,
                }))
              }}
            >
              发布
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 图片墙，可以选择文章封面 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">封面列表</ModalHeader>
              <ModalBody>
                <ImageWall
                  isArticleImageWall={true}
                  handleSelect={(url) => {
                    setArticleAddParams((prev) => ({
                      ...prev,
                      coverImage: url,
                    }))
                    onClose()
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" onPress={onClose}>
                  确认
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

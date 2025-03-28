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
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArticleAddEditType, CategoryType, TagType } from '@/types'
import { getCategoryListAPI } from '@/apis/category'
import { getTagListAPI } from '@/apis/tag'
import ImageWall from '@/admin/components/ImageWall'
import { addArticleAPI, getArticleInfoAPI, updateArticleAPI } from '@/apis/article'
import { getTagIdsAPI } from '@/apis'

export default function ArticleAddEdit() {
  const [articleParams, setArticleParams] = useState<Partial<ArticleAddEditType>>({})
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [tags, setTags] = useState<TagType[]>([])

  const navigate = useNavigate()
  const { id } = useParams()
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

    // 如果是编辑文章
    if (id) {
      const fetchArticleTagData = async () => {
        try {
          const articleData = await getArticleInfoAPI(Number(id))
          const tagIdsData = await getTagIdsAPI(Number(id))
          setArticleParams({
            id: articleData.id,
            title: articleData.title,
            summary: articleData.summary,
            content: articleData.content,
            coverImage: articleData.coverImage,
            categoryId: articleData.categoryId,
            tagIds: tagIdsData,
          })
        } catch (error) {
          console.error(error)
        }
      }
      fetchArticleTagData()
    }
  }, [id])

  // 处理输入框变化
  const handleChange = (field: keyof ArticleAddEditType, value: string) => {
    setArticleParams((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? value.trim() : value,
    }))
  }

  // 提交文章
  const handleSubmit = async () => {
    try {
      if (id) {
        await updateArticleAPI(articleParams as ArticleAddEditType)
        addToast({
          title: '文章更新成功',
          color: 'success',
          timeout: 3000,
        })
      } else {
        await addArticleAPI(articleParams as ArticleAddEditType)
        addToast({
          title: '文章添加成功',
          color: 'success',
          timeout: 3000,
        })
      }
      navigate('/admin/article-list')
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '未知错误',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  useEffect(() => {
    // 只有在添加文章模式下（即没有 id），并且 state 不为 undefined 时自动提交
    if (articleParams.state !== undefined) {
      handleSubmit()
    }
  }, [articleParams])

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
              value={articleParams.title ?? ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          {/* 内容 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章内容</span>
            <Textarea
              maxRows={28}
              placeholder="请输入文章内容..."
              value={articleParams.content ?? ''}
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </div>

          {/* 摘要 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章摘要</span>
            <Textarea
              placeholder="请输入文章摘要..."
              value={articleParams.summary ?? ''}
              onChange={(e) => handleChange('summary', e.target.value)}
            />
          </div>

          {/* 分类 */}
          <div className="flex items-start gap-4">
            <span className="text-nowrap w-20">文章分类</span>
            <RadioGroup
              defaultValue={String(articleParams.categoryId)}
              orientation="horizontal"
              value={String(articleParams.categoryId)}
              onValueChange={(key) =>
                setArticleParams((prev) => ({
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
              defaultValue={articleParams.tagIds?.map(String) || []}
              orientation="horizontal"
              value={articleParams.tagIds?.map(String) || []} // number[] 转 string[]
              onValueChange={(key) =>
                setArticleParams((prev) => ({
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
                className={`${articleParams.coverImage ? '' : 'border-2 border-dashed rounded-[13px]'}`}
              >
                <Image
                  src={articleParams.coverImage}
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
                setArticleParams((prev) => ({
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
                setArticleParams((prev) => ({
                  ...prev,
                  state: 1,
                }))
              }}
            >
              {id ? '更新并发布' : '发布'}
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
                    setArticleParams((prev) => ({
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

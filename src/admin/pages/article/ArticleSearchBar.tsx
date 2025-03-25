import { Button, Input, Select, SelectItem } from '@heroui/react'
import { FiSearch } from 'react-icons/fi'
import { KeyboardEvent, useEffect, useState } from 'react'
import { ArticlePageParams, Category } from '@/types'
import { getCategoryListAPI } from '@/apis/category'

const states = [
  { label: '发布', key: 1 },
  { label: '草稿', key: 0 },
]

interface ArticleSearchBarProps {
  articlePageParams: ArticlePageParams
  onArticleFilterChange: (articlePageParams: ArticlePageParams) => void
}

export default function ArticleSearchBar({
  articlePageParams,
  onArticleFilterChange,
}: ArticleSearchBarProps) {
  const [titleFilter, setTitleFilter] = useState('')
  const [stateFilter, setStateFilter] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  // 获取分类列表
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await getCategoryListAPI()
        setCategories(data)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        } else {
          console.error('未知错误')
        }
      }
    }
    fetchCategoryData()
  }, [])

  // 点击input里面的按钮进行搜索
  const handleInputClick = () => {
    if (!titleFilter) {
      return
    }
    onArticleFilterChange({
      ...articlePageParams,
      title: titleFilter,
    })
  }

  // 按下enter键进行搜索
  const handleInputKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return
    }
    handleInputClick()
  }

  // 清空搜索框
  const handleInputClear = () => {
    onArticleFilterChange({
      ...articlePageParams,
      title: '',
    })
    setTitleFilter('')
  }

  useEffect(() => {
    onArticleFilterChange({
      ...articlePageParams,
      state: stateFilter!,
      categoryId: categoryFilter!,
    })
  }, [stateFilter, categoryFilter])

  return (
    <div className="flex items-center gap-4">
      <div>
        <Input
          isClearable
          placeholder="请输入文章标题进行查询"
          value={titleFilter}
          name="title"
          onChange={(e) => setTitleFilter(e.target.value)}
          onKeyUp={handleInputKeyUp}
          onClear={handleInputClear}
          startContent={
            <button className="h-full" onClick={handleInputClick}>
              <FiSearch />
            </button>
          }
        />
      </div>

      <Select
        aria-label="select article state"
        className="w-36"
        placeholder="选择发布状态"
        selectedKeys={stateFilter !== null ? [String(stateFilter)] : []}
        onChange={(e) => {
          setStateFilter(parseInt(e.target.value, 10))
        }}
      >
        {states.map((state) => (
          <SelectItem key={String(state.key)}>{state.label}</SelectItem>
        ))}
      </Select>

      <Select
        aria-label="select article category"
        className="w-40"
        placeholder="选择文章分类"
        selectedKeys={categoryFilter !== null ? [String(categoryFilter)] : []}
        onChange={(e) => {
          setCategoryFilter(parseInt(e.target.value, 10))
        }}
      >
        {categories.map((category) => (
          <SelectItem key={String(category.id)}>{category.name}</SelectItem>
        ))}
      </Select>

      <Button
        color="primary"
        variant="flat"
        onPress={() => {
          if (stateFilter === null && categoryFilter === null && !titleFilter) {
            return
          }
          setStateFilter(null)
          setCategoryFilter(null)
          handleInputClear()
        }}
      >
        重置
      </Button>
    </div>
  )
}

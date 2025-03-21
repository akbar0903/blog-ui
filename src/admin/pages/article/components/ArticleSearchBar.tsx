import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import { FiSearch } from 'react-icons/fi'
import { Key, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { ArticlePageParams, Category } from '@/types'
import { getCategoryListAPI } from '@/apis/category'
import { ERROR_MESSAGES } from '@/message/message'
import { GoChevronDown } from 'react-icons/go'

const states = [
  { name: '发布', id: 1 },
  { name: '草稿', id: 0 },
]

interface ArticleSearchBarProps {
  articlePageParams: ArticlePageParams
  onArticleFilterChange: (articlePageParams: ArticlePageParams) => void
}

export default function ArticleSearchBar({
  articlePageParams,
  onArticleFilterChange,
}: ArticleSearchBarProps) {
  const [filterTitle, setFilterTitle] = useState('')
  const [stateFilter, setStateFilter] = useState<number | undefined>(undefined)
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined)
  const [categories, setCategories] = useState<Category[]>([])

  // 获取分类列表
  const fetchCategoryData = useCallback(async () => {
    try {
      const response = await getCategoryListAPI()
      if (response.code === 1) {
        setCategories(response.data)
      } else {
        throw new Error(response.msg || ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    }
  }, [])

  useEffect(() => {
    fetchCategoryData()
  }, [fetchCategoryData])

  // 点击input里面的按钮进行搜索
  const handleInputClick = () => {
    if (!filterTitle) {
      return
    }

    onArticleFilterChange({
      ...articlePageParams,
      title: filterTitle,
    })
  }

  // 按下enter键进行搜索
  const handleInputKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputClick()
    } else {
      return
    }
  }

  // 清空搜索框
  const handleInputClear = () => {
    onArticleFilterChange({
      ...articlePageParams,
      title: '',
    })
    setFilterTitle('')
  }

  // 根据文章state搜索
  const handleStateFilterChange = (key: Key) => {
    setStateFilter((prevState) => (prevState === key ? undefined : (key as number)))
  }

  // 根据文章category进行搜搜
  const handleCategoryFilterChange = (key: Key) => {
    setCategoryFilter((prevState) => (prevState === key ? undefined : (key as number)))
  }

  useEffect(() => {
    onArticleFilterChange({
      ...articlePageParams,
      state: stateFilter,
      categoryId: categoryFilter,
    })
  }, [stateFilter, categoryFilter])

  return (
    <div className="flex items-center gap-4">
      <div>
        <Input
          isClearable
          placeholder="请输入文章标题进行查询"
          value={filterTitle}
          name="title"
          onChange={(e) => setFilterTitle(e.target.value)}
          onKeyUp={handleInputKeyUp}
          onClear={handleInputClear}
          startContent={
            <button className="h-full" onClick={handleInputClick}>
              <FiSearch />
            </button>
          }
        />
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button endContent={<GoChevronDown className="text-small" />} variant="flat">
            状态
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          selectedKeys={stateFilter ? [stateFilter] : []}
          selectionMode="single"
          aria-label="Article State Menu"
          onAction={handleStateFilterChange}
        >
          {states.map((state) => (
            <DropdownItem key={state.id}>{state.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button endContent={<GoChevronDown className="text-small" />} variant="flat">
            分类
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          selectionMode="single"
          selectedKeys={categoryFilter ? [categoryFilter] : []}
          onAction={handleCategoryFilterChange}
          aria-label="Category List Menu"
        >
          {categories.map((category) => (
            <DropdownItem key={category.id}>{category.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

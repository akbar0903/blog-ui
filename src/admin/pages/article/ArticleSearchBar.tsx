import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react'
import { FiSearch } from 'react-icons/fi'
import { KeyboardEvent, useEffect, useState } from 'react'
import { ArticlePageParams, Category } from '@/types'
import { getCategoryListAPI } from '@/apis/category'
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
  const [titleFilter, setTitleFilter] = useState('')
  const [stateFilter, setStateFilter] = useState<number | undefined>(undefined)
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined)
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
          onAction={(key) => {
            setStateFilter(key as number)
          }}
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
          onAction={(key) => {
            setCategoryFilter(key as number)
          }}
          aria-label="Category List Menu"
        >
          {categories.map((category) => (
            <DropdownItem key={category.id}>{category.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button
        color="primary"
        variant="flat"
        onPress={() => {
          if (stateFilter === undefined && categoryFilter === undefined && !titleFilter) {
            return
          }
          setStateFilter(undefined)
          setCategoryFilter(undefined)
          handleInputClear()
        }}
      >
        重置
      </Button>
    </div>
  )
}

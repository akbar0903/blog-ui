import { getArticleListAPI } from '@/apis/article'
import { getCategoryListAPI } from '@/apis/category'
import { ERROR_MESSAGES } from '@/message/message'
import { ArticleData, Category } from '@/types'
import {
  Chip,
  ChipProps,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Image,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Input,
} from '@heroui/react'
import { Key, useCallback, useEffect, useState } from 'react'
import { BsBook } from 'react-icons/bs'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { GoChevronDown, GoPlus } from 'react-icons/go'

const columns = [
  { name: '标题', uid: 'title' },
  { name: '封面', uid: 'coverImage' },
  { name: '状态', uid: 'state' },
  { name: '分类', uid: 'categoryName' },
  { name: '标签', uid: 'tagNames' },
  { name: '创建时间', uid: 'createdTime' },
  { name: '更新时间', uid: 'updatedTime' },
  { name: '操作', uid: 'actions' },
]

const stateColorMap: Record<string, ChipProps['color']> = {
  1: 'success',
  0: 'warning',
}

export default function ArticleTableList() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(5)
  const [titleFilter, setTitleFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined)

  // 获取分类信息
  const fetchCategoryData = async () => {
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
  }

  // 获取文章信息
  const fetchArticleData = async () => {
    try {
      const response = await getArticleListAPI({
        pageNum: currentPage,
        pageSize: pageSize,
        title: titleFilter,
        categoryId: categoryFilter,
      })
      if (response.code === 1) {
        setArticles(response.data.rows)
        setTotal(response.data.total)
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
  }

  useEffect(() => {
    fetchArticleData()
  }, [currentPage, categoryFilter])

  useEffect(() => {
    fetchCategoryData()
  }, [])

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 表格渲染函数
  const renderCell = useCallback((article: ArticleData, columnKey: Key) => {
    if (!article) return null

    switch (columnKey) {
      case 'coverImage':
        return <Image src={article.coverImage} alt={article.title} width={80} height={80} />
      case 'title':
        return <p className="font-bold">{article.title}</p>
      case 'state':
        return (
          <Chip color={stateColorMap[article.state]} size="sm" variant="flat">
            {article.state === 1 ? '已发布' : '草稿'}
          </Chip>
        )
      case 'categoryName':
        return <p>{article.categoryName}</p>
      case 'tagNames':
        return (
          <div className="flex gap-1 flex-wrap">
            {article.tagNames.map((tag, index) => (
              <Chip key={`${tag}-${index}`} size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        )
      case 'createdTime':
        return <p>{article.createdTime}</p>
      case 'updatedTime':
        return <p>{article.updatedTime}</p>
      case 'actions':
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="预览">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <BsBook />
              </span>
            </Tooltip>
            <Tooltip content="编辑">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaRegEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        )
    }
  }, [])

  // 清空搜索框
  // 清空搜索框
  const onClear = useCallback(() => {
    setTitleFilter('') // 清空标题过滤条件
    setCategoryFilter(undefined) // 清空分类过滤条件
    setCurrentPage(1)
  }, [])

  // 表格上方内容
  const TableHeaderContent = () => {
    return (
      <div className="flex justify-between gap-3 items-end">
        <Input
          placeholder="根据文章标题搜索"
          value={titleFilter}
          onClear={() => onClear()}
          onValueChange={value => setTitleFilter(value)}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<GoChevronDown className="text-small" />} variant="flat">
                文章分类
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              selectionMode="single"
              selectedKeys={categoryFilter ? [categoryFilter] : []}
              onAction={key => {
                // 判断点击的 key 是否为当前已选的 categoryFilter，如果是，则清空
                if (key === categoryFilter) {
                  setCategoryFilter(undefined) // 清空过滤条件
                } else {
                  setCategoryFilter(key as number) // 更新为点击的分类ID
                }
              }}
            >
              {categories.map(category => (
                <DropdownItem key={category.id}>{category.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" endContent={<GoPlus />}>
            添加文章
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 文章列表 */}
      <Table
        className="mt-4"
        topContent={<TableHeaderContent />}
        bottomContent={
          <div className="flex items-center justify-center">
            <Pagination
              key={total}
              color="primary"
              isCompact
              total={Math.ceil(total / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        }
        aria-label="文章列表"
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              className="text-sm"
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={articles}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

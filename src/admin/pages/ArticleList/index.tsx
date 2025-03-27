import { Button, Card, CardBody } from '@heroui/react'
import { ArticleData, ArticlePageParams } from '@/types'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article.ts'
import ArticleTable from '@/admin/pages/ArticleList/ArticleTable'
import ArticleSearchBar from '@/admin/pages/ArticleList/ArticleSearchBar'
import CustomPagination from '@/admin/components/CustomPagination.tsx'
import { useNavigate } from 'react-router-dom'

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [total, setTotal] = useState(0)

  const navigate = useNavigate()

  // 文章信息请求参数
  const [articlePageParams, setArticlePageParams] = useState<ArticlePageParams>({
    pageNum: 1,
    pageSize: 6,
    title: '',
    categoryId: undefined,
    state: undefined,
  })

  // 获取文章信息
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const data = await getArticleListAPI(articlePageParams)
        setArticles(data.rows)
        setTotal(data.total)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        } else {
          console.error('未知错误')
        }
      }
    }
    fetchArticleData()
  }, [articlePageParams])

  // 处理文章分页
  const handlePageChange = (pageNum: number) => {
    setArticlePageParams((prev) => ({
      ...prev,
      pageNum,
    }))
  }

  return (
    <Card>
      <CardBody>
        {/*头部区域*/}
        <div className="flex items-center justify-between">
          <ArticleSearchBar
            articlePageParams={articlePageParams}
            onArticleFilterChange={setArticlePageParams}
          />
          <Button onPress={() => navigate('/admin/article-add')} color="primary" className="ml-4">
            添加文章
          </Button>
        </div>

        {/*文章列表*/}
        <ArticleTable articles={articles} />

        {/*分页*/}
        <CustomPagination
          total={total}
          pageSize={articlePageParams.pageSize!}
          pageNum={articlePageParams.pageNum!}
          onPageChange={handlePageChange}
        />
      </CardBody>
    </Card>
  )
}

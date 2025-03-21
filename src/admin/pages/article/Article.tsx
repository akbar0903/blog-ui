import { Button, Card, CardBody } from '@heroui/react'
import { ArticleData, ArticlePageParams } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article.ts'
import { ERROR_MESSAGES } from '@/message/message.ts'
import ArticleTable from '@/admin/pages/article/components/ArticleTable.tsx'
import ArticleSearchBar from '@/admin/pages/article/components/ArticleSearchBar.tsx'
import CustomPagination from '@/admin/components/CustomPagination.tsx'

export default function Article() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [total, setTotal] = useState(0)

  // 文章信息请求参数
  const [articlePageParams, setArticlePageParams] = useState<ArticlePageParams>({
    pageNum: 1,
    pageSize: 6,
    title: '',
    categoryId: undefined,
    state: undefined,
  })

  // 获取文章信息
  const fetchArticleData = useCallback(async () => {
    try {
      const response = await getArticleListAPI(articlePageParams)
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
  }, [articlePageParams])

  useEffect(() => {
    fetchArticleData()
  }, [fetchArticleData])

  // 处理文章分页
  const handlePageChange = (pageNum: number) => {
    setArticlePageParams({
      ...articlePageParams,
      pageNum: pageNum,
    })
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
          <Button>添加文章</Button>
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

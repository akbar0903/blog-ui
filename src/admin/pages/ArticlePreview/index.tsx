import { getArticleInfoAPI } from '@/apis/article'
import ArticleDetail from '@/components/ArticleDetail'
import TableOfContents from '@/components/TableOfContents'
import { ArticleData } from '@/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ArticlePreview() {
  const [article, setArticle] = useState<Partial<ArticleData>>()

  const { id } = useParams()

  // 获取文章详情
  useEffect(() => {
    if (!id || isNaN(Number(id))) return // 避免无效 id

    const fetchArticle = async () => {
      try {
        const data = await getArticleInfoAPI(Number(id))
        setArticle(data)
      } catch (error) {
        console.error(error instanceof Error ? error.message : '未知错误')
      }
    }
    fetchArticle()
  }, [id])

  if (!id || isNaN(Number(id))) {
    return <p>文章不存在！</p>
  }

  if (!article) {
    return <p>加载中...</p>
  }

  return (
    <div className="flex">
      {/* 左侧文章内容 */}
      <div className="flex-1">
        <ArticleDetail backHref="/admin/article-list" article={article as ArticleData} />
      </div>

      {/* 右侧目录 */}
      <div className="w-80 ml-8">
        <TableOfContents content={article.content || ''} />
      </div>
    </div>
  )
}

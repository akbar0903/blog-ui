import { LuCalendarDays } from 'react-icons/lu'
import { TiArrowBack } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { Chip } from '@heroui/react'
import { ArticleData } from '@/types'
import MarkdownRenderer from '@/components/MarkdownRenderer.tsx'

interface ArticleDetailProps {
  article: ArticleData
  backHref: string
}

export default function ArticleDetail({ article, backHref }: ArticleDetailProps) {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Back button */}
      <Link
        to={backHref}
        className="inline-flex items-center text-medium md:text-lg text-primary hover:underline mb-6"
      >
        <TiArrowBack className="w-4 h-4 md:w-5 md:h-5 mr-2" />
        返回
      </Link>

      <article className="bg-content1 rounded-2xl shadow-md overflow-hidden">
        {/* Cover image */}
        <div className="relative h-60 sm:h-[500px] w-full">
          <img
            src={article.coverImage}
            alt={article.title || '文章封面'}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article header */}
        <div className="p-4 sm:p-8">
          {/* 状态 */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Chip color={article.state === 1 ? 'success' : 'warning'}>
              {article.state === 1 ? <span>已发布</span> : <span>草稿</span>}
            </Chip>
          </div>

          {/* 标题 */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>

          {/* 创建时间和分类 */}
          <div className="flex items-center gap-4 text-sm text-foreground-600 mb-6">
            <div className="flex items-center">
              <LuCalendarDays className="w-4 h-4 mr-1" />
              <span>{article.createdTime}</span>
            </div>
            <span className="flex items-center gap-1">
              <span className="text-primary font-bold">#</span>
              <span>{article.categoryName || '未分类'}</span>
            </span>
          </div>

          {/* 摘要 */}
          <div className="p-4 bg-foreground-100 rounded-lg mb-8 border-l-4 border-primary">
            <p className="text-foreground-700 italic">{article.summary}</p>
          </div>

          {/* Article 内容 */}
          {/*<div className="prose prose-lg max-w-none">{article.content}</div>*/}
          <MarkdownRenderer content={article.content} />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-foreground-100">
            <div className="flex flex-wrap gap-2">
              {article.tagNames?.map((tag, index) => (
                <Chip variant="flat" size="sm" key={`${tag}-${index}`}>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* Update info */}
          {article.updatedTime && (
            <div className="mt-4 text-sm text-foreground-500">最后更新于 {article.updatedTime}</div>
          )}
        </div>
      </article>
    </div>
  )
}

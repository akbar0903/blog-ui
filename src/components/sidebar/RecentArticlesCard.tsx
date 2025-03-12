import { Card, CardBody, CardHeader, Link, Image } from '@heroui/react'

type Article = {
  id: number
  title: string
  content: string
  coverImage: string
  tags: string[]
  publishDate: string
}

type RecentArticlesCardProps = {
  articles: Article[]
}

export default function RecentArticlesCard({ articles }: RecentArticlesCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-0">
        <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-0 space-y-3">
        {articles.slice(0, 3).map(article => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="flex items-center gap-3 group"
          >
            <div className="w-16 h-16 flex items-center relative flex-shrink-0">
              <Image
                src={article.coverImage || '/placeholder.svg'}
                alt={article.title}
                className="object-cover"
                radius="sm"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold line-clamp-2 text-black dark:text-white group-hover:text-blue-500 transition-colors">
                {article.title}
              </h3>
              <time className="text-xs text-gray-600 dark:text-gray-400">
                {formatDate(article.publishDate)}
              </time>
            </div>
          </Link>
        ))}
      </CardBody>
    </Card>
  )
}

// Helper function to format date
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

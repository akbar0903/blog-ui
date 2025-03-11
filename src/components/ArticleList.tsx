import { Card, CardBody, Chip, Image, Link } from '@heroui/react'

import coverImage from '@/assets/music-image.jpg'
import { IoArrowForwardSharp } from 'react-icons/io5'

export type Article = {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  tags: string[]
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt:
      'Learn how to create beautiful responsive layouts using Tailwind CSS utility classes and best practices.',
    coverImage: '/placeholder.svg?height=400&width=600',
    date: '2023-11-15',
    tags: ['Tailwind CSS', 'Responsive Design'],
  },
  {
    id: '2',
    title: 'Getting Started with Next.js and TypeScript',
    excerpt:
      'A comprehensive guide to setting up and building modern comprehensive guide to setting up and building mo web applications with Next.js and TypeScript.',
    coverImage: '/placeholder.svg?height=400&width=600',
    date: '2023-11-10',
    tags: ['Next.js', 'TypeScript'],
  },
  {
    id: '3',
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt:
      'Explore upcoming trends and technologies that will shape the future of web development in the coming year.',
    coverImage: '/placeholder.svg?height=400&width=600',
    date: '2023-11-05',
    tags: ['Web Development', 'Trends'],
  },
]

export default function ArticleList() {
  return (
    <div className="space-y-6">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card isBlurred isHoverable className="overflow-hidden max-h-80 md:max-h-60">
      <CardBody className="p-0 flex flex-col md:flex-row relative">
        {/* Cover image - takes full width on small screens, fixed width on larger screens */}
        <div className="w-full md:w-1/3 max-h-80 md:max-h-60 overflow-hidden">
          <Image src={coverImage} alt={article.title} className="object-cover" radius="none" />
        </div>

        {/* Article content - below image on small screens, beside image on larger screens */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-2">
            <div className="flex flex-wrap gap-2 overflow-hidden">
              {article.tags.map((tag, index) => (
                <Chip key={`${tag}-${index}`} color="primary" variant="flat">
                  {tag}
                </Chip>
              ))}
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <time className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(article.date)}
            </time>
          </div>

          <h2 className="mb-2 text-[17px] sm:text-xl font-semibold line-clamp-2">
            {article.title}
          </h2>
          <p className="mb-2 hidden md:line-clamp-2 text-gray-600 dark:text-gray-400">
            {article.excerpt}
          </p>

          <Link href={`/articles/${article.id}`} color="primary">
            Read more
            <IoArrowForwardSharp className="h-5 w-5" />
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

// Helper function to format date
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

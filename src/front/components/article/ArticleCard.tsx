import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { LuCalendarDays } from 'react-icons/lu'

type Article = {
  id: number
  title: string
  content: string
  coverImage: string
  tags: string[]
  publishDate: string
}

type ArticleCardProps = {
  article: Article
  isReversed: boolean
}

export default function ArticleCard({ article, isReversed }: ArticleCardProps) {
  const { title, content, coverImage, tags, publishDate } = article

  return (
    <Card className="w-full max-h-[420px] md:max-h-[240px]">
      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="relative w-full h-40 overflow-hidden">
          <Image src={coverImage} alt={title} className="object-cover" />
        </div>
        <CardBody className="px-4 pt-4 pb-0 space-y-2">
          <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
          <p className="hidden md:line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {content}
          </p>
          <div className="flex items-center text-blue-500 font-medium">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <LuCalendarDays className="h-4 w-4" />
            <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Chip key={`${tag}-${index}`} size="sm" variant="flat" color="primary">
                {tag}
              </Chip>
            ))}
          </div>
        </CardFooter>
      </div>

      {/* Desktop layout - not reversed */}
      {!isReversed && (
        <div className="hidden md:flex max-h-[240px]">
          <div className="relative w-[40%] flex-shrink-0">
            <Image
              src={coverImage}
              alt={title}
              width={400}
              height={240}
              radius="none"
              isZoomed
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <CardBody className="space-y-3 px-6 pt-6 pb-0">
              <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{content}</p>
              <div className="flex items-center text-blue-500 font-medium">
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center mt-auto px-6 pb-6 pt-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <LuCalendarDays className="h-4 w-4" />
                <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Chip key={`${tag}-${index}`} size="sm" variant="flat" color="primary">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardFooter>
          </div>
        </div>
      )}

      {/* Desktop layout - reversed */}
      {isReversed && (
        <div className="hidden md:flex max-h-[240px]">
          <div className="flex-1 flex flex-col">
            <CardBody className="space-y-2 px-6 pt-6 pb-0">
              <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{content}</p>
              <div className="flex items-center text-blue-500 font-medium">
                <span>Read more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center mt-auto px-6 pb-6 pt-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <LuCalendarDays className="h-4 w-4" />
                <time dateTime={publishDate}>{new Date(publishDate).toLocaleDateString()}</time>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Chip key={`${tag}-${index}`} size="sm" variant="flat" color="primary">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardFooter>
          </div>
          <div className="relative w-[40%] flex-shrink-0">
            <Image
              src={coverImage}
              alt={title}
              width={400}
              height={240}
              radius="none"
              isZoomed
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      )}
    </Card>
  )
}

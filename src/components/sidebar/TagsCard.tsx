import { Card, CardBody, CardHeader, Chip, Link } from '@heroui/react'

type TagsCardProps = {
  tags: string[]
}

export default function TagsCard({ tags }: TagsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-0">
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link key={index} href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
              <Chip
                variant="flat"
                className="hover:text-blue-500 hover:bg-blue-500/20 transition-colors"
              >
                {tag}
              </Chip>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

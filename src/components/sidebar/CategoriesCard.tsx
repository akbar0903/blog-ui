import { Card, CardBody, CardHeader, Chip, Link } from '@heroui/react'

type CategoryType = {
  name: string
  count: number
}

type CategoriesCardProps = {
  categories: CategoryType[]
}

export default function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-0">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-0">
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={`${index}-${category}`}>
              <Link
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex justify-between items-center text-gray-700 dark:text-gray-400"
              >
                <span className="hover:underline hover:text-primary">{category.name}</span>
                <Chip radius="full" size="sm" variant="flat">
                  {category.count}
                </Chip>
              </Link>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}

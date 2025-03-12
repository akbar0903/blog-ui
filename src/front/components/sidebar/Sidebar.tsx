import ProfileCard from '@/front/components/sidebar/ProfileCard.tsx'
import CategoriesCard from './CategoriesCard.tsx'
import TagsCard from './TagsCard.tsx'
import RecentArticlesCard from './RecentArticlesCard.tsx'

const articles = [
  {
    id: 1,
    title:
      'This is a very long card title that should be truncated after two lines because we want to test the truncation effect in our card design system and make sure it works properly',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    coverImage: 'https://picsum.photos/800/600?image=1041',
    tags: ['HTML', 'CSS'],
    publishDate: '2024-03-11',
  },
  {
    id: 2,
    title:
      'Another extremely long card title that demonstrates the two-line truncation feature in our responsive card layout system with proper ellipsis at the end',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    coverImage: 'https://picsum.photos/800/600?image=1080',
    tags: ['PHP', 'SQL', 'Database'],
    publishDate: '2024-03-10',
  },
  {
    id: 3,
    title:
      'Yet another long title to showcase how our card handles text overflow and ensures consistent layout across different screen sizes and content lengths',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    coverImage: 'https://picsum.photos/800/600?image=1039',
    tags: ['JavaScript', 'React'],
    publishDate: '2024-03-09',
  },
  {
    id: 4,
    title:
      'This card title will also be truncated after two lines to maintain consistency in our design system and ensure proper visual hierarchy',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    coverImage: 'https://picsum.photos/800/600?image=943',
    tags: ['Design', 'UI/UX'],
    publishDate: '2024-03-08',
  },
]

// Sample categories data
const categories = [
  { name: 'Web Development', count: 12 },
  { name: 'JavaScript', count: 8 },
  { name: 'React', count: 6 },
  { name: 'CSS', count: 5 },
  { name: 'TypeScript', count: 4 },
]

// Sample tags data
const tags = [
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'CSS',
  'Tailwind CSS',
  'Web Development',
  'Frontend',
  'Backend',
  'Node.js',
  'API',
  'Performance',
  'Accessibility',
]

export default function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Author Profile Card */}
      <ProfileCard />

      {/* Categories Card */}
      <CategoriesCard categories={categories} />

      {/* Tags Card */}
      <TagsCard tags={tags} />

      {/* Recent Articles Card */}
      <RecentArticlesCard articles={articles} />
    </div>
  )
}

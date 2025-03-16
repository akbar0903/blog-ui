import ArticleList from '@/front/components/article/ArticleList.tsx'
import Sidebar from '@/front/components/sidebar/Sidebar.tsx'

export default function FrontHome() {
  return (
    <section className="min-h-screen flex flex-col items-center space-y-5 w-full mx-auto py-10">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-tr from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Hi, 我是艾克
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Main content area - article list */}
        <div className="lg:w-3/4">
          <ArticleList />
        </div>

        {/* Sidebar - only visible on large screens */}
        <div className="hidden lg:block lg:w-1/4">
          <Sidebar />
        </div>
      </div>
    </section>
  )
}

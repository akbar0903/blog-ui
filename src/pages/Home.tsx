import { Button, Link } from '@heroui/react'

export default function Home() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-tr from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Hi, 我是艾克
        </h1>

        <p className="dark:text-gray-400 text-lg mb-8 max-w-lg">
          一名充满激情的软件开发者，专注于前端开发，热衷于打造美观且易用的用户界面。
        </p>

        <div className="flex justify-center space-x-4">
          <Button as={Link} color="primary" showAnchorIcon href="/project" size="lg">
            浏览项目
          </Button>
          <Button as={Link} color="primary" variant="flat" showAnchorIcon href="/contact" size="lg">
            联系我
          </Button>
        </div>
      </div>
    </section>
  )
}

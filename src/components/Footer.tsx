import { FaBilibili } from 'react-icons/fa6'
import { LuGithub } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { SiGitee } from 'react-icons/si'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50 dark:bg-slate-900 py-8 px-6 mt-16 border-t border-blue-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo和描述 */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">
                ak<span className="text-blue-500">.blog</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              专注于前端开发，热衷于打造美观且易用的用户界面。
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 text-sm"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 text-sm"
                >
                  关于
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 text-sm"
                >
                  项目
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 text-sm"
                >
                  联系我
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              联系方式
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@example.com"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400 text-sm flex items-center gap-2"
                >
                  <MdOutlineMailOutline className="h-4 w-4" />
                  <span>contact@example.com</span>
                </a>
              </li>
              <li className="flex space-x-4 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <LuGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <FaBilibili className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <SiGitee className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

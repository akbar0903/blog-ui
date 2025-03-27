import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import FrontLayout from '@/front/layout'
import AdminLayout from '@/admin/layout'
import AuthRoute from '@/admin/components/AuthRoute.tsx'
import LoginRoute from '@/admin/components/LoginRoute.tsx'

// 前台
const FrontHome = lazy(() => import('@/front/pages/FrontHome.tsx'))
const FrontAbout = lazy(() => import('@/front/pages/FrontAbout.tsx'))

// 后台
const Login = lazy(() => import('@/admin/pages/login'))
const AdminHome = lazy(() => import('@/admin/pages/home'))
const ArticleList = lazy(() => import('@/admin/pages/ArticleList'))
const ArticleAdd = lazy(() => import('@/admin/pages/ArticleAdd'))
const Category = lazy(() => import('@/admin/pages/category'))
const Tag = lazy(() => import('@/admin/pages/tag'))
const Image = lazy(() => import('@/admin/pages/image'))
const Account = lazy(() => import('@/admin/pages/account'))

const router = createBrowserRouter([
  // 前台
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <FrontHome />,
      },
      {
        path: '/about',
        element: <FrontAbout />,
      },
    ],
  },

  // 后台
  {
    path: '/login',
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthRoute>
        <AdminLayout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: 'article-list',
        element: <ArticleList />,
      },
      {
        path: 'article-add',
        element: <ArticleAdd />,
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'tag',
        element: <Tag />,
      },
      {
        path: 'image',
        element: <Image />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
])

export default router

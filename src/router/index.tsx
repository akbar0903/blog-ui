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
const Article = lazy(() => import('@/admin/pages/article'))
const AdminCategory = lazy(() => import('@/admin/pages/category'))
const AdminTag = lazy(() => import('@/admin/pages/tag'))
const AdminImage = lazy(() => import('@/admin/pages/image'))
const AdminAccount = lazy(() => import('@/admin/pages/AdminAccount.tsx'))

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
        path: 'article',
        element: <Article />,
      },
      {
        path: 'category',
        element: <AdminCategory />,
      },
      {
        path: 'tag',
        element: <AdminTag />,
      },
      {
        path: 'image',
        element: <AdminImage />,
      },
      {
        path: 'account',
        element: <AdminAccount />,
      },
    ],
  },
])

export default router

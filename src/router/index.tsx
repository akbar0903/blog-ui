import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import FrontLayout from '@/front/layout'
import AdminLayout from '@/admin/layout'

const FrontHome = lazy(() => import('@/front/pages/FrontHome.tsx'))
const FrontAbout = lazy(() => import('@/front/pages/FrontAbout.tsx'))

const Login = lazy(() => import('@/admin/pages/Login.tsx'))
const AdminHome = lazy(() => import('@/admin/pages/AdminHome.tsx'))
const AdminCategory = lazy(() => import('@/admin/pages/AdminCategory.tsx'))
const AdminTag = lazy(() => import('@/admin/pages/AdminTag.tsx'))
const AdminImage = lazy(() => import('@/admin/pages/AdminImage.tsx'))
const AdminAccount = lazy(() => import('@/admin/pages/AdminAccount.tsx'))

const router = createBrowserRouter([
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

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
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

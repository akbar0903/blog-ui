import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import FrontLayout from '@/front/layout'
import AdminLayout from '@/admin/layout'

const FrontHome = lazy(() => import('@/front/pages/Home'))
const About = lazy(() => import('@/front/pages/About'))

const Login = lazy(() => import('@/admin/pages/Login.tsx'))
const AdminHome = lazy(() => import('@/admin/pages/Home'))
const Category = lazy(() => import('@/admin/pages/Category'))
const Tag = lazy(() => import('@/admin/pages/Tag'))
const Image = lazy(() => import('@/admin/pages/Image'))
const Account = lazy(() => import('@/admin/pages/Account'))

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
        element: <About />,
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

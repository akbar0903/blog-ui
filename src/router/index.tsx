import { createBrowserRouter } from 'react-router-dom'
import FrontLayout from '@/front/layout'
import Home from '@/front/pages/Home'
import About from '@/front/pages/About'
import Login from '@/admin/pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },

  {
    path: '/admin',
    element: <Login />,
  },
])

export default router

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import '@/styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
)

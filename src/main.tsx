import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/index.tsx'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </HeroUIProvider>
  </StrictMode>
)

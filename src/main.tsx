import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import router from '@/router'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={40} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HeroUIProvider>
  </StrictMode>
)

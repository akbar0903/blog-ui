import Header from '@/front/layout/Header.tsx'
import Footer from '@/front/layout/Footer.tsx'
import MainContent from './MainContent.tsx'
import { Suspense } from 'react'
import { Spinner } from '@heroui/react'

export default function Layout() {
  return (
    <Suspense
      fallback={
        <Spinner variant="wave" className="min-h-screen flex items-center justify-center"></Spinner>
      }
    >
      <div className="min-h-screen">
        <Header />

        <MainContent />

        <Footer />
      </div>
    </Suspense>
  )
}

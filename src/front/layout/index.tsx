import { Suspense } from 'react'
import Header from '@/front/layout/Header.tsx'
import Footer from '@/front/layout/Footer.tsx'
import MainContent from './MainContent.tsx'

export default function Layout() {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <div className="min-h-screen">
        <Header />

        <MainContent />

        <Footer />
      </div>
    </Suspense>
  )
}

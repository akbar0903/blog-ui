import LoadingScreen from '@/front/pages/LoadingScreen.tsx'
import { useState } from 'react'
import Header from '@/front/layout/Header.tsx'
import Footer from '@/front/layout/Footer.tsx'
import MainContent from './MainContent.tsx'

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {isLoaded && <LoadingScreen onComplete={() => setIsLoaded(false)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${!isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Header />

        <MainContent />

        <Footer />
      </div>
    </>
  )
}

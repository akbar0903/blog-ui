import LoadingScreen from '@/pages/LoadingScreen'
import { useState } from 'react'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import MainContent from './MainContent'

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

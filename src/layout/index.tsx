import LoadingScreen from '@/pages/LoadingScreen'
import { useState } from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {isLoaded && <LoadingScreen onComplete={() => setIsLoaded(false)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          !isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />

        <main className="max-w-7xl mx-auto px-6">
          <Outlet />
        </main>

        {/* <Footer /> */}
      </div>
    </>
  )
}

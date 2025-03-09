import LoadingScreen from '@/components/LoadingScreen'
import { useState } from 'react'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(true)

  return (
    <>
      { isLoaded && <LoadingScreen onComplete={ () => setIsLoaded(false) } /> }
      <h1 className="text-4xl">进入首页</h1>
    </>
  )
}

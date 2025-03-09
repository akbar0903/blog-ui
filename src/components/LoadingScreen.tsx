import { Progress } from '@heroui/react'
import { useEffect, useState } from 'react'

type Props = {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [text, setText] = useState('')
  const [progressValue, setProgressValue] = useState(0)
  const fullText = '<Hello World />'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      // 计算进度条的百分比
      const progress = Math.min((index / fullText.length) * 100, 100)
      setProgressValue(progress)

      setText(fullText.substring(0, index))
      index++

      if (index > fullText.length) {
        clearInterval(interval)

        // 确保进度条到100%
        setProgressValue(100)

        setTimeout(() => {
          onComplete()
        }, 1000);
      }
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-bold">
        {text}
        <span className="animate-blink ml-1"> | </span>
      </div>

      <div className="w-[300px] h-[5px] bg-gray-800 relative overflow-hidden">
        <Progress
          aria-label="Loading..."
          value={progressValue}
          className="h-full"
        />
      </div>
    </div>
  )
}

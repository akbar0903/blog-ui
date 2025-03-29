import { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { FiArrowUp } from 'react-icons/fi'

interface ScrollToTopButtonProps {
  showAfterScrollY?: number // 滚动多少像素后显示按钮（默认 300）
}

export default function ScrollToTopButton({ showAfterScrollY = 300 }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScrollY])

  // 回到顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return isVisible ? (
    <Button
      onPress={scrollToTop}
      isIconOnly
      variant="shadow"
      color="primary"
      className="fixed bottom-6 right-6"
      aria-label="回到顶部"
    >
      <FiArrowUp className="w-5 h-5" />
    </Button>
  ) : null
}

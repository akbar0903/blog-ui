import { useState, useEffect } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { AiOutlineSun } from 'react-icons/ai'
import { Button } from '@heroui/react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Button
      variant="light"
      isIconOnly
      onPress={toggleTheme}
      aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      {theme === 'light' ? (
        <FaRegMoon className="h-5 w-5" />
      ) : (
        <AiOutlineSun className="h-5 w-5" />
      )}
    </Button>
  )
}

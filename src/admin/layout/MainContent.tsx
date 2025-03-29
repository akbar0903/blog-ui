import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner } from '@heroui/react'

type Props = {
  isOpen: boolean
}

export default function MainContent({ isOpen }: Props) {
  return (
    <div
      className={` ${isOpen ? 'ml-40' : 'ml-0'} h-[calc(100vh-64px)] bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="main-container p-5 bg-slate-100 dark:bg-zinc-950 h-full border-tl rounded-tl-[30px] overflow-y-scroll scroll-smooth">
        <Suspense
          fallback={
            <Spinner
              variant="wave"
              className="min-h-screen flex items-center justify-center"
            ></Spinner>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

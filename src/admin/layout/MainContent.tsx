import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export default function MainContent() {
  return (
    <div className="flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

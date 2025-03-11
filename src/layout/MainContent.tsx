import { Outlet } from 'react-router-dom'

export default function MainContent() {
  return (
    <main className="max-w-7xl mx-auto px-6">
      <Outlet />
    </main>
  )
}

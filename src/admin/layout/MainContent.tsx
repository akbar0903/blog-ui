import { Outlet } from 'react-router-dom'

export default function MainContent() {
  return (
    <div className="flex-1">
      <Outlet />
    </div>
  )
}

import { useEffect } from 'react'
import { request } from '@/utils'

export default function AdminHome() {
  useEffect(() => {
    request.get('/admin/info', { params: { id: 1 } })
  }, [])

  return <div>Home</div>
}

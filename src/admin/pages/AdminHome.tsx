import { useEffect } from 'react'
import { request } from '@/utils'

export default function AdminHome() {
  useEffect(() => {
    request.get('/admin/info', { params: { id: 1 } })
  }, [])

  return (
    <>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
      <h1 className="text-4xl">hello</h1>
    </>
  )
}

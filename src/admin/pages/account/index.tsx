import UpdateInfo from './UpdateInfo'
import UpdatePassword from './UpdatePassword'

export default function Account() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UpdateInfo />
      <UpdatePassword />
    </div>
  )
}

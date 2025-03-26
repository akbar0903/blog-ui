import { uploadImageAPI } from '@/apis'
import { updateAdminInfoAPI } from '@/apis/admin'
import { RootState } from '@/store'
import { setLoginAdminInfo } from '@/store/modules/admin'
import { UpdataAdmin } from '@/types'
import { addToast, Button, Card, CardBody, CardHeader, Image, Input } from '@heroui/react'
import { useState } from 'react'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

export default function UpdateInfo() {
  const [updateAdminParams, setUpdateAdminParams] = useState<Partial<UpdataAdmin>>({})
  const [isLoading, setIsLoading] = useState(false)

  // 从redux中获取用户信息
  const loginAdminInfo = useSelector((state: RootState) => state.admin.loginAdminInfo)
  const dispatch = useDispatch()

  // 更新头像
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const url = await uploadImageAPI(formData)
      await updateAdminInfoAPI({ ...loginAdminInfo, avatar: url })
      dispatch(setLoginAdminInfo({ ...loginAdminInfo, avatar: url }))
      addToast({ title: '头像修改成功', color: 'success', timeout: 3000 })
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '头像修改失败',
        color: 'danger',
        timeout: 3000,
      })
    }
  }

  // 用户修改输入框内容后，更新 updateAdminParams 状态，用于存储修改后的信息：
  const handleChange =
    (field: keyof UpdataAdmin) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateAdminParams((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  // 提交修改
  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await updateAdminInfoAPI({ ...loginAdminInfo, ...updateAdminParams })
      dispatch(setLoginAdminInfo({ ...loginAdminInfo, ...updateAdminParams }))
      addToast({ title: '信息更新成功', color: 'success', timeout: 3000 })
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '更新失败',
        color: 'danger',
        timeout: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="py-2">
      <CardHeader className="px-6">
        <h2 className="text-xl">更新账户信息</h2>
      </CardHeader>
      <CardBody className="px-6 gap-4">
        {/* 头像 */}
        <div className="flex justify-center bg-transparent">
          <div className="relative w-36 h-36 border border-dashed border-foreground-400 rounded-lg shadow-md flex justify-center items-center group">
            <input
              type="file"
              className="opacity-0 absolute inset-0 cursor-pointer z-20"
              onChange={handleFileChange}
            />
            {/* 遮罩层，hover 时变暗 */}
            <div className="rounded-lg absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <MdOutlineCloudUpload className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <Image
              src={loginAdminInfo.avatar}
              alt="avatar"
              height={144}
              width={144}
              className="object-cover rounded-[8px] z-0"
            />
          </div>
        </div>

        {/* 常规信息 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">用户名</span>
            <Input placeholder="请输入用户名" value={loginAdminInfo.username} isDisabled />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">昵称</span>
            <Input
              placeholder="请输入昵称"
              value={updateAdminParams.name ?? loginAdminInfo.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">地址</span>
            <Input
              placeholder="请输入地址"
              value={updateAdminParams.address ?? loginAdminInfo.address}
              onChange={handleChange('address')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">邮箱</span>
            <Input
              placeholder="请输入邮箱"
              type="email"
              value={updateAdminParams.email ?? loginAdminInfo.email}
              onChange={handleChange('email')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">QQ号</span>
            <Input
              placeholder="请输入QQ号"
              value={updateAdminParams.qqNumber ?? loginAdminInfo.qqNumber}
              onChange={handleChange('qqNumber')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">B站地址</span>
            <Input
              placeholder="请输入B站地址"
              value={updateAdminParams.bilibiliUrl ?? loginAdminInfo.bilibiliUrl}
              onChange={handleChange('bilibiliUrl')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">Github站地址</span>
            <Input
              placeholder="请输入Github地址"
              value={updateAdminParams.githubUrl ?? loginAdminInfo.githubUrl}
              onChange={handleChange('githubUrl')}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">Gitee站地址</span>
            <Input
              placeholder="请输入Gitee地址"
              value={updateAdminParams.giteeUrl ?? loginAdminInfo.giteeUrl}
              onChange={handleChange('giteeUrl')}
            />
          </div>
          <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
            提交
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

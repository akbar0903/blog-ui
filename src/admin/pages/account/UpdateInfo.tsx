import { RootState } from '@/store'
import { Button, Card, CardBody, CardHeader, Image, Input } from '@heroui/react'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function UpdateInfo() {
  // redux中获取用户信息
  const loginAdminInfo = useSelector((state: RootState) => state.admin.loginAdminInfo)

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
              // onChange={handleFileChange}
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
            <span className="text-nowrap w-32">角色</span>
            <Input placeholder="请输入用户角色" value={loginAdminInfo.role} isDisabled />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">昵称</span>
            <Input placeholder="请输入昵称" value={loginAdminInfo.name} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">地址</span>
            <Input placeholder="请输入地址" value={loginAdminInfo.address} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">邮箱</span>
            <Input placeholder="请输入邮箱" type="email" value={loginAdminInfo.email} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">QQ号</span>
            <Input placeholder="请输入QQ号" value={loginAdminInfo.qqNumber} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">B站地址</span>
            <Input placeholder="请输入B站地址" value={loginAdminInfo.bilibiliUrl} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">Github站地址</span>
            <Input placeholder="请输入Github地址" value={loginAdminInfo.githubUrl} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-nowrap w-32">Gitee站地址</span>
            <Input placeholder="请输入Gitee地址" value={loginAdminInfo.giteeUrl} />
          </div>
          <Button color="primary">提交</Button>
        </div>
      </CardBody>
    </Card>
  )
}

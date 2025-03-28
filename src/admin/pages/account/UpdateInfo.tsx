import ImageWall from '@/admin/components/ImageWall'
import { updateAdminInfoAPI } from '@/apis/admin'
import { RootState } from '@/store'
import { setLoginAdminInfo } from '@/store/modules/admin'
import { UpdataAdmin } from '@/types'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function UpdateInfo() {
  const [updateAdminParams, setUpdateAdminParams] = useState<Partial<UpdataAdmin>>({})
  const [isLoading, setIsLoading] = useState(false)

  // 从redux中获取用户信息
  const loginAdminInfo = useSelector((state: RootState) => state.admin.loginAdminInfo)
  const dispatch = useDispatch()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
    <>
      <Card className="py-2">
        <CardHeader className="px-6">
          <h2 className="text-xl">更新账户信息</h2>
        </CardHeader>
        <CardBody className="px-6 gap-4">
          {/* 头像 */}
          <div className="flex justify-center gap-4">
            <div className="flex flex-col gap-4 relative">
              <div
                className={`${loginAdminInfo.avatar ? '' : 'border-2 border-dashed rounded-[13px]'}`}
              >
                <Image
                  src={loginAdminInfo.avatar}
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
              <Button color="primary" onPress={onOpen}>
                选择头像
              </Button>
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

      {/* 图片墙，可以选择文章封面 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">图片列表</ModalHeader>
              <ModalBody>
                <ImageWall
                  isArticleImageWall={true}
                  handleSelect={(url) => {
                    setUpdateAdminParams((prev) => ({
                      ...prev,
                      avatar: url,
                    }))
                    dispatch(setLoginAdminInfo({ ...loginAdminInfo, avatar: url }))
                    onClose()
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" onPress={onClose}>
                  确认
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

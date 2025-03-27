import PasswordInput from '@/admin/components/PasswordInput'
import { updatePasswordAPI } from '@/apis/admin'
import { RootState } from '@/store'
import { clearLoginAdminInfo, clearToken } from '@/store/modules/admin'
import { UpdatePasswordType } from '@/types'
import { PASSWORD_REGEX } from '@/utils'
import { addToast, Button, Card, CardBody, CardHeader } from '@heroui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UpdatePassword() {
  // 从redux中获取用户id
  const { id } = useSelector((state: RootState) => state.admin.loginAdminInfo)
  const dispatch = useDispatch()

  const [passwordParams, setPasswordParams] = useState<UpdatePasswordType>({
    id: id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // 处理输入变化
  const handleChange = (field: keyof UpdatePasswordType, value: string) => {
    setPasswordParams((prev) => ({
      ...prev,
      [field]: value.trim(),
    }))
  }

  // 提交
  const handleSubmit = async () => {
    if (
      !passwordParams.oldPassword ||
      !passwordParams.newPassword ||
      !passwordParams.confirmPassword
    ) {
      addToast({
        title: '请填写所有字段',
        color: 'warning',
        timeout: 3000,
      })
      return
    }
    if (passwordParams.oldPassword.length < 6) {
      addToast({
        title: '旧密码长度不能少于6个字符',
        color: 'warning',
        timeout: 3000,
      })
      return
    }
    if (!PASSWORD_REGEX.test(passwordParams.newPassword)) {
      addToast({
        title: '新密码必须至少8位，并包含大小写字母、数字和特殊字符',
        color: 'danger',
        timeout: 3000,
      })
      return
    }
    if (passwordParams.newPassword !== passwordParams.confirmPassword) {
      addToast({
        title: '新密码和确认密码不匹配',
        color: 'danger',
        timeout: 3000,
      })
      return
    }

    setIsLoading(true)
    try {
      await updatePasswordAPI(passwordParams)
      dispatch(clearLoginAdminInfo())
      dispatch(clearToken())
      navigate('/login')
      addToast({
        title: '密码修改成功，请重新登录',
        color: 'success',
        timeout: 3000,
      })
    } catch (error) {
      addToast({
        title: error instanceof Error ? error.message : '密码更新失败',
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
        <h2 className="text-xl">更新密码</h2>
      </CardHeader>
      <CardBody className="px-6 gap-3">
        <div className="flex items-center gap-4">
          <span className="text-nowrap w-20">旧密码</span>
          <PasswordInput
            placeholder="请输入旧密码"
            value={passwordParams.oldPassword}
            onChange={(e) => handleChange('oldPassword', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-nowrap w-20">新密码</span>
          <PasswordInput
            placeholder="请输入新密码"
            value={passwordParams.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-nowrap w-20">确认密码</span>
          <PasswordInput
            placeholder="请确认密码"
            value={passwordParams.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
          />
        </div>
        <Button onPress={handleSubmit} color="primary" isLoading={isLoading}>
          提交
        </Button>
      </CardBody>
    </Card>
  )
}

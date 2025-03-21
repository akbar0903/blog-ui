import { addFeaturePlanAPI, deleteFeaturePlanAPI, getFeaturePlanListAPI } from '@/apis/feature-plan'
import { ERROR_MESSAGES } from '@/message/message'
import { FeaturePlan, FeaturePlanParams } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import FeatureCard from './FeatureCard'
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@heroui/react'

export default function FeatureCardList() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [featurePlans, setFeaturePlans] = useState<FeaturePlan[]>([])
  const [planParams, setPlanParams] = useState<FeaturePlanParams>({
    title: '',
    description: '',
  })

  // 获取计划列表
  const fetchFeatureCardsData = useCallback(async () => {
    try {
      const response = await getFeaturePlanListAPI()
      if (response.code === 1) {
        setFeaturePlans(response.data)
      } else {
        throw new Error(ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }, [])

  useEffect(() => {
    fetchFeatureCardsData()
  }, [fetchFeatureCardsData])

  // 新增计划
  const handlePlanSubmit = async () => {
    if (!planParams.title || !planParams.description) {
      addToast({ title: '请输入计划信息', color: 'danger' })
      return
    }

    try {
      const response = await addFeaturePlanAPI({ ...planParams })
      if (response.code === 1) {
        addToast({ title: '计划添加成功', color: 'success' })
        fetchFeatureCardsData() // 重新获取数据，刷新列表
      } else {
        throw new Error(ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    }

    setPlanParams({
      title: '',
      description: '',
    })
    onClose()
  }

  // 删除计划
  // 删除功能计划
  const handleDeletePlan = async (id: number) => {
    try {
      const response = await deleteFeaturePlanAPI(id)
      if (response.code === 1) {
        addToast({ title: '计划删除成功', color: 'success' })
        fetchFeatureCardsData()
      } else {
        throw new Error(ERROR_MESSAGES.DATA_FETCH_FAILED)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between px-2 pb-3">
        <h2 className="text-lg text-foreground-500 font-bold">功能计划列表</h2>
        <Button color="primary" onPress={onOpen}>
          新增计划
        </Button>
      </div>
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featurePlans.map((plan) => (
          <FeatureCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            isCompleted={plan.isCompleted}
            createdTime={plan.createdTime}
            completedTime={plan.completedTime}
            onDelete={() => handleDeletePlan(plan.id)}
          />
        ))}
      </div>

      {/* 对话框 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">添加新的功能计划</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    type="text"
                    label="功能名称"
                    labelPlacement="outside"
                    placeholder="输入功能名称"
                    value={planParams.title}
                    onChange={(e) =>
                      setPlanParams({
                        ...planParams,
                        title: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    isRequired
                    label="描述信息"
                    labelPlacement="outside"
                    placeholder="请输入描述信息"
                    onChange={(e) =>
                      setPlanParams({
                        ...planParams,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" onPress={handlePlanSubmit}>
                  提交
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

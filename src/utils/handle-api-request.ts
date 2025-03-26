import { addToast } from '@heroui/react'

/**
 *
 * @param apiCall API请求函数
 * @param successMessage 成功提示信息
 * @param fetchData 用来刷新数据的函数
 * @returns
 */
export const handleAPIRequest = async <T>(
  apiCall: () => Promise<T>,
  successMessage: string,
  fetchData: () => Promise<void>
): Promise<T | void> => {
  try {
    const result = await apiCall() // 调用 API
    addToast({
      title: successMessage,
      color: 'success',
      timeout: 3000,
    })
    fetchData() // 成功后刷新数据
    return result // 返回 API 请求的结果
  } catch (error) {
    addToast({
      title: error instanceof Error ? error.message : '操作失败',
      color: 'danger',
      timeout: 3000,
    })
  }
}

import { ApiResponse, FeaturePlan, FeaturePlanParams } from '@/types'
import { request } from '@/utils'

export const getFeaturePlanListAPI = (): Promise<ApiResponse<FeaturePlan[]>> => {
  return request({
    url: '/feature-plan/list',
    method: 'GET',
  })
}

export const addFeaturePlanAPI = (data: FeaturePlanParams): Promise<ApiResponse<null>> => {
  return request({
    url: '/feature-plan',
    method: 'POST',
    params: {
      ...data,
    },
  })
}

export const deleteFeaturePlanAPI = (id: number): Promise<ApiResponse<null>> => {
  return request({
    url: `/feature-plan/${id}`,
    method: 'DELETE',
  })
}

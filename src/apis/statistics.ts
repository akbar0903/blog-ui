import { request } from '@/utils'
import { ApiResponse, StatisticsData } from '@/types'

/**
 * 获取首页卡片数据
 */
export const statisticsAPI = (): Promise<ApiResponse<StatisticsData>> => {
  return request({
    url: '/statistics',
    method: 'GET',
  })
}

import { request } from '@/utils'
import { StatisticsData } from '@/types'

/**
 * 获取首页卡片数据
 */
export const statisticsAPI = (): Promise<StatisticsData> => {
  return request({
    url: '/statistics',
    method: 'GET',
  })
}

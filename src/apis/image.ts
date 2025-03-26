import { ImageData, ImagePageParams, PageResult } from '@/types'
import { request } from '@/utils'

export const getImageListAPI = (pageParams: ImagePageParams): Promise<PageResult<ImageData[]>> => {
  return request({
    url: '/image',
    method: 'GET',
    params: {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
    },
  })
}

export const uploadImageAPI = (file: FormData): Promise<string> => {
  return request({
    url: '/image/upload',
    method: 'POST',
    data: file,
  })
}

export const deleteImageAPI = (url: string, objectName: string): Promise<string> => {
  return request({
    url: '/image/delete',
    method: 'DELETE',
    params: {
      url: url,
      objectName: objectName,
    },
  })
}

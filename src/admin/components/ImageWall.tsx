import { deleteImageAPI, getImageListAPI, uploadImageAPI } from '@/apis'
import { ImageData, ImagePageParams } from '@/types'
import { Button, Image } from '@heroui/react'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'
import CustomPagination from './CustomPagination'
import { IoMdCheckmark } from 'react-icons/io'
import { handleAPIRequest } from '@/utils'

interface ImageWallProps {
  // 给文章选择封面用
  isArticleImageWall?: boolean
  handleSelect?: (url: string) => void
}

export default function ImageWall(props: ImageWallProps) {
  const { isArticleImageWall = false, handleSelect } = props

  const [images, setImages] = useState<ImageData[]>([])
  const [total, setTotal] = useState(0)
  const [pageParams, setPageParams] = useState<ImagePageParams>({
    pageNum: 1,
    pageSize: 7,
  })

  // 获取图片列表
  const fetchImageData = async () => {
    try {
      const data = await getImageListAPI(pageParams)
      setImages(data.rows)
      setTotal(data.total)
    } catch (error) {
      console.error(error instanceof Error ? error.message : '未知错误')
    }
  }
  useEffect(() => {
    fetchImageData()
  }, [pageParams])

  // 处理文件上传
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 创建 FormData 对象，并将文件附加到其中
    const formData = new FormData()
    formData.append('file', file)

    // 上传
    handleAPIRequest<string>(() => uploadImageAPI(formData), '上传成功', fetchImageData)
  }

  // 删除图片
  const handleDelete = async (url: string, objectName: string) => {
    handleAPIRequest(() => deleteImageAPI(url, objectName), '删除成功', fetchImageData)
  }

  // 处理分页
  const handlePageChange = (pageNum: number) => {
    setPageParams((prev) => ({
      ...prev,
      pageNum,
    }))
  }

  return (
    <>
      {/* 图片列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
        {/* 文件上传卡片 */}
        <div
          className={`relative w-full ${isArticleImageWall ? 'h-[200px]' : 'h-[300]'} border border-dashed border-foreground-400 rounded-lg shadow-md flex justify-center items-center hover:bg-success-100 transition-colors`}
        >
          <input
            type="file"
            className="opacity-0 absolute inset-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <AiOutlinePlus className="w-5 h-5" />
        </div>
        {images.map((image) => (
          <div
            key={image.id}
            className="relative flex items-center justify-center group rounded-[14px] overflow-hidden shadow-md"
          >
            <Image
              src={image.url}
              alt="Image"
              height={isArticleImageWall ? 200 : 300}
              className="object-cover"
            />

            {/* layer层 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-10"></div>
            {/* 选择按钮和删除按钮 */}
            {isArticleImageWall ? (
              /* 选择按钮 */
              <Button
                isIconOnly
                onPress={() => handleSelect?.(image.url)}
                className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex"
              >
                <IoMdCheckmark className="h-4 w-4" />
              </Button>
            ) : (
              /* 删除按钮 */
              <Button
                isIconOnly
                onPress={() => handleDelete(image.url, image.objectName)}
                className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex"
              >
                <FaRegTrashAlt className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className={`${isArticleImageWall ? 'mt-4' : 'mt-8'}`}>
        <CustomPagination
          total={total}
          pageSize={pageParams.pageSize}
          pageNum={pageParams.pageNum}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

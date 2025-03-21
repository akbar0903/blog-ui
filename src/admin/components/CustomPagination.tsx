import { Pagination } from '@heroui/react'

interface ArticlePaginationProps {
  total: number
  pageSize: number
  pageNum: number
  onPageChange: (pageNum: number) => void
}

export default function CustomPagination({
  total,
  pageSize,
  pageNum,
  onPageChange,
}: ArticlePaginationProps) {
  return (
    <div className="flex items-center justify-center">
      <Pagination
        key={total}
        color="primary"
        isCompact
        total={Math.ceil(total / pageSize!)}
        page={pageNum}
        onChange={onPageChange}
        showControls
      />
    </div>
  )
}

import React, { useEffect, useState } from 'react'

interface TableOfContentsProps {
  content: string // 文章内容，markdown 格式
}

interface IAnchor {
  key: string
  href: string
  title: string
  level: number
  children?: IAnchor[]
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [anchorList, setAnchorList] = useState<IAnchor[]>([])

  // 提取 markdown 内容中的标题
  const generateAnchorList = (hNodeList: NodeListOf<HTMLElement>) => {
    const anchorList: IAnchor[] = []
    let index = 0
    let currentAnchor: IAnchor | null = null

    const createAnchor = (item: HTMLElement) => {
      const level = parseInt(item.nodeName.split('')[1], 10)
      const anchor: IAnchor = {
        key: `#heading-${++index}`,
        href: `#heading-${index}`,
        title: item.textContent || '',
        level,
      }

      // 为标题元素添加 id 属性
      item.id = `heading-${index}`

      return anchor
    }

    const transform = (item: HTMLElement) => {
      const anchor = createAnchor(item)
      if (anchorList.length === 0) {
        anchorList.push(anchor)
        currentAnchor = anchor
      } else {
        if (anchor.level > currentAnchor!.level) {
          currentAnchor!.children = currentAnchor?.children ?? []
          currentAnchor!.children.push(anchor)
        } else {
          anchorList.push(anchor)
          currentAnchor = anchor
        }
      }
    }

    hNodeList.forEach((item) => {
      if (item.nodeName.startsWith('H') && parseInt(item.nodeName.split('')[1], 10) <= 3) {
        transform(item)
      }
    })

    return anchorList
  }

  // 渲染目录
  useEffect(() => {
    const hNodeList = document.querySelectorAll('h1, h2, h3') // 查找文章中的标题
    setAnchorList(generateAnchorList(hNodeList as NodeListOf<HTMLElement>))
  }, [content])

  const renderAnchorList = (anchors: IAnchor[]): React.ReactNode => {
    return (
      <ul>
        {anchors.map((anchor) => (
          <li key={anchor.key}>
            <a
              href={anchor.href}
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.href) as HTMLElement
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {anchor.title}
            </a>
            {anchor.children && renderAnchorList(anchor.children)}
          </li>
        ))}
      </ul>
    )
  }

  return <div className="fixed top-40 h-full overflow-y-auto">{renderAnchorList(anchorList)}</div>
}

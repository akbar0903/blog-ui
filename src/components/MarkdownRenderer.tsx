import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LuChevronDown, LuChevronRight, LuCopy, LuCopyCheck } from 'react-icons/lu'
import { useState } from 'react'
import { Button } from '@heroui/react'
import remarkDirective from 'remark-directive'
import { visit } from 'unist-util-visit'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-base md:prose-lg max-w-none dark:prose-invert prose-pre:p-0 prose-pre:my-4 prose-h1:text-xl md:prose-h1:text-2xl lg:prose-h1:text-3xl prose-h2:text-lg md:prose-h2:text-xl lg:prose-h2:text-2xl prose-h3:text-base md:prose-h3:text-lg lg:prose-h3:text-xl prose-h4:text-sm md:prose-h4:text-base lg:prose-h4:text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkDirective, remarkCustomDirectives]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            // 如果不是内敛代码
            return match ? (
              <CodeBlock language={match[1]} code={String(children).trim()} />
            ) : (
              <code
                className="bg-foreground-200 before:content-none after:content-none !px-1 rounded"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2 秒后恢复原状态
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* 代码块头部 */}
      <div className="flex justify-between items-center px-3 py-2 bg-slate-700">
        <div className="flex items-center">
          {/* 折叠按钮 */}
          <button onClick={() => setIsExpanded(!isExpanded)} className="mr-2">
            {isExpanded ? (
              <LuChevronDown className="w-4 h-4" />
            ) : (
              <LuChevronRight className="w-4 h-4" />
            )}
          </button>
          {/* 语言名称 */}
          <span className="md:!text-lg">{language}</span>
        </div>

        {/* 复制按钮 */}
        <Button onPress={handleCopy} isIconOnly radius="sm" size="sm" className="bg-foreground-300">
          {copied ? (
            <LuCopyCheck className="w-4 h-4 text-success" />
          ) : (
            <LuCopy className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* 代码块 */}
      {isExpanded && (
        <SyntaxHighlighter
          language={language}
          style={okaidia}
          PreTag="div"
          className="!m-0 !px-0 !text-base md:!text-lg !rounded-t-none"
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  )
}

// markdown扩展语法，比如（：：：danger等等）
function remarkCustomDirectives() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, (node: any) => {
      if (node.type === 'containerDirective' || node.type === 'leafDirective') {
        const data = node.data || (node.data = {})
        const tagName = node.name

        // 根据指令类型，设置类名和图标
        if (['danger', 'warning', 'info', 'success'].includes(tagName)) {
          data.hName = 'div'
          data.hProperties = {
            className: `alert alert-${tagName}`, // 设置不同的类名
          }
        }
      }
    })
  }
}

import {
  addToDoAPI,
  deleteToDoAPI,
  getToDoListAPI,
  toggleToDoAPI,
  updateToDoAPI,
} from '@/apis/to-do'
import type { ToDo, ToDoParams } from '@/types'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  type ChipProps,
  Input,
  Select,
  SelectItem,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { GoX } from 'react-icons/go'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { LuCalendarDays, LuCirclePlus } from 'react-icons/lu'

const typeItems = [
  { label: '学习', key: '学习' },
  { label: '生活', key: '生活' },
  { label: '健身', key: '健身' },
  { label: '其它', key: '其它' },
]

const typeColorMap: Record<string, ChipProps['color']> = {
  学习: 'primary',
  生活: 'success',
  健身: 'secondary',
  其它: 'warning',
}

export default function ToDoList() {
  const [toDoParams, setToDoParams] = useState<ToDoParams>({
    title: '',
    type: '',
  })
  const [toDos, setToDos] = useState<ToDo[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState<'all' | 'unCompleted' | 'completed'>('all')

  // 获取ToDos
  const fetchToDos = async () => {
    try {
      const data = await getToDoListAPI()
      setToDos(data)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('未知错误')
      }
    }
  }
  useEffect(() => {
    fetchToDos()
  }, [])

  // 添加todo
  const addToDo = async () => {
    if (toDoParams.title.trim() === '' || toDoParams.type.trim() === '') {
      addToast({ title: '请填写任务信息', color: 'warning', timeout: 3000 })
      return
    }

    try {
      await addToDoAPI(toDoParams)
      addToast({ title: '任务添加成功', color: 'success', timeout: 3000 })
      fetchToDos()
      // 清空输入
      setToDoParams({
        title: '',
        type: '',
      })
    } catch (error) {
      if (error instanceof Error) {
        addToast({ title: error.message || '任务添加失败', color: 'danger', timeout: 3000 })
      } else {
        console.error('未知错误')
      }
    }
  }

  // 删除todo
  const handleDelete = async (id: number) => {
    try {
      await deleteToDoAPI(id)
      addToast({ title: '任务删除成功', color: 'success', timeout: 3000 })
      fetchToDos()
    } catch (error) {
      if (error instanceof Error) {
        addToast({ title: error.message || '任务删除失败', color: 'danger', timeout: 3000 })
      } else {
        console.error('未知错误')
      }
    }
  }

  // 更改todo状态
  const handleToggle = async (id: number) => {
    try {
      await toggleToDoAPI(id)
      addToast({ title: '任务状态修改成功', color: 'success', timeout: 3000 })
      fetchToDos()
    } catch (error) {
      if (error instanceof Error) {
        addToast({ title: error.message || '任务状态修改失败', color: 'danger', timeout: 3000 })
      } else {
        console.error('未知错误')
      }
    }
  }

  // 编辑todo
  const startEdit = (todo: ToDo) => {
    setEditId(todo.id)
    setEditText(todo.title)
  }
  const saveEdit = async (id: number) => {
    if (editText.trim() === '') {
      addToast({ title: '请填写任务信息', color: 'warning', timeout: 3000 })
      return
    }

    try {
      await updateToDoAPI(id, editText)
      addToast({ title: '任务修改成功', color: 'success', timeout: 3000 })
      setEditId(null)
      fetchToDos()
    } catch (error) {
      if (error instanceof Error) {
        addToast({ title: error.message || '任务修改失败', color: 'danger', timeout: 3000 })
      } else {
        console.error('未知错误')
      }
    }
  }
  const cancelEdit = () => {
    setEditId(null)
  }

  // 对任务进行过滤
  const filteredTodos = toDos.filter((todo) => {
    if (filter === 'unCompleted') {
      return todo.isCompleted !== 1
    }
    if (filter === 'completed') {
      return todo.isCompleted === 1
    }
    return true
  })

  return (
    <Card>
      <CardHeader className="p-6 pb-0">
        <h1 className="text-xl">任务清单</h1>
      </CardHeader>

      <CardBody className="p-6 pt-4 gap-3">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="添加新任务..."
            value={toDoParams.title}
            onChange={(e) =>
              setToDoParams({
                ...toDoParams,
                title: e.target.value,
              })
            }
          />

          <Select
            aria-label="select todo type"
            placeholder="选择任务类型"
            value={toDoParams.type}
            onChange={(e) => {
              setToDoParams({
                ...toDoParams,
                type: e.target.value,
              })
            }}
          >
            {typeItems.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>

          <Button
            onPress={addToDo}
            color="primary"
            startContent={<LuCirclePlus className="h-4 w-4" />}
          >
            添加
          </Button>
        </div>

        {/* 对todo进行过滤 */}
        <div className="flex gap-2">
          <Button
            color={filter === 'all' ? 'primary' : 'default'}
            size="sm"
            onPress={() => setFilter('all')}
          >
            全部
          </Button>
          <Button
            color={filter === 'unCompleted' ? 'warning' : 'default'}
            size="sm"
            onPress={() => setFilter('unCompleted')}
          >
            未完成
          </Button>
          <Button
            color={filter === 'completed' ? 'success' : 'default'}
            size="sm"
            onPress={() => setFilter('completed')}
          >
            已完成
          </Button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>暂无任务</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 border border-foreground-200 rounded-lg flex items-center ${todo.isCompleted === 1 ? 'bg-success-50' : 'bg-foreground-50'} `}
              >
                <Checkbox
                  isSelected={todo.isCompleted === 1 ? true : false}
                  onValueChange={() => {
                    handleToggle(todo.id)
                  }}
                />
                <div className="ml-3 flex-grow">
                  {editId === todo.id ? (
                    <div className="flex items-center gap-1">
                      <Input
                        className="flex-grow"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                        color="primary"
                        variant="flat"
                      />
                      <Button
                        onPress={() => saveEdit(todo.id)}
                        size="sm"
                        isIconOnly
                        variant="light"
                      >
                        <IoCheckmarkOutline className="h-4 w-4" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" onPress={cancelEdit}>
                        <GoX className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p
                        className={`text-medium ${todo.isCompleted === 1 ? 'line-through text-foreground-500' : ''}`}
                      >
                        {todo.title}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Chip color={typeColorMap[todo.type] ?? 'default'} size="sm">
                          {todo.type}
                        </Chip>

                        {todo.createdTime && (
                          <Chip size="sm" color="primary" variant="flat">
                            <div className="flex items-center gap-1">
                              <LuCalendarDays className="h-3 w-3" />
                              {todo.createdTime}
                            </div>
                          </Chip>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {editId !== todo.id && (
                  <div className="flex gap-1">
                    <Button size="sm" isIconOnly variant="light" onPress={() => startEdit(todo)}>
                      <FaRegEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="light"
                      onPress={() => handleDelete(todo.id)}
                    >
                      <FaRegTrashAlt className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="text-sm text-foreground-500 flex justify-between">
          <span>总计: {toDos.length} 项任务</span>
          <span>已完成: {toDos.filter((todo) => todo.isCompleted === 1).length} 项</span>
        </div>
      </CardBody>
    </Card>
  )
}

export interface ToDo {
  id: number
  title: string
  type: string
  isCompleted: number
  completedTime: string
  createdTime: string
  updatedTime: string
}

export interface ToDoParams {
  title: string
  type: string
}

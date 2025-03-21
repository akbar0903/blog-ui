export interface FeaturePlan {
  id: number
  title: string
  description: string
  isCompleted: number
  completedTime: string
  createdTime: string
  updatedTime: string
}

export interface FeaturePlanParams {
  title: string
  description: string
}

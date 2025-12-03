// api 함수 정의
import { api } from './api'
import { fitApi } from './fitApi'

// 운동 루틴 진행 상태 변경 (progress를 true로)
export const patchPlanProgress = async (planId: number) => {
  const response = await api.patch(`/plan/patch/${planId}`)
  return response.data.data
}

// 운동 세부 내용 불러오기
export type ExerciseDetail = {
  exerciseName: string
  type: string
  difficulty: string
  image: string | null
  intro: string
  equipment: string
  targetArea: string
  primaryMuscle: string
  durationSec: number
  reps: number
  sets: number
  restSec: number
  restrictAreas: string[]
  detailResponses: {
    category: string
    sequence: number
    content: string
  }[]
}

// 운동 세부 내용 불러오기
export const getExerciseDetail = async (exerciseId: number): Promise<ExerciseDetail> => {
  const response = await api.get<{ data: ExerciseDetail }>(`/exercise/get/${exerciseId}`)
  return response.data.data
}

// 7일치 운동 루틴 생성
export const generateRoutine = async (): Promise<string> => {
  const { data } = await fitApi.post('/fit/routine')
  return data.message
}

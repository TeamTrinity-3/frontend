// api 함수 정의
import { api } from './api'

// 카테고리 목록 타입
export type TargetArea = {
  engName: string
  korName: string
  image: string
}

// 카테고리 목록 조회
export const getTargetAreas = async (): Promise<TargetArea[]> => {
  const response = await api.get('/targetArea')
  return response.data.data
}

// 운동 검색 결과 타입
export type ExerciseCard = {
  exerciseId: number
  image: string | null
  exerciseName: string
  intro: string
  totalSec: number
}

// 운동 페이지네이션 구조
export type ExercisePage = {
  content: ExerciseCard[]
  totalPages: number
  totalElements: number
  number: number // 현재 페이지 (0부터 시작)
  size: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

// 카테고리 조회 파라미터
export type ExerciseSearchParams = {
  targetArea?: string // FULL_BODY 같은 enum 영문
  page?: number // 0부터, 안 보내면 0
  size?: number // 기본 12, 최대 30 (백엔드 규칙)
}

// 카테고리/페이지별 운동 목록 조회
export const getExercises = async (params: ExerciseSearchParams): Promise<ExercisePage> => {
  const response = await api.get('/exercise', { params })
  return response.data.data
}

// 검색어 사용 api
export const searchExercises = async (
  keyword: string,
  page = 0,
  size = 12,
): Promise<ExercisePage> => {
  const trimmed = keyword.trim()
  const params: Record<string, string | number> = { page, size }

  // keyword가 없으면 전체 리스트 조회
  if (trimmed.length > 0) {
    params.keyword = trimmed
  }

  const { data } = await api.get<{ data: ExercisePage }>('/exercise/search', { params })
  return data.data
}

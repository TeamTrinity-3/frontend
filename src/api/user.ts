// api 함수 정의
import { api } from './api'
import { fitApi } from './fitApi'

// 이름, 프로필 사진 불러오기
export const getUserProfile = async () => {
  const response = await api.get('/user/get')
  return response.data.data
}

// Day1 ~ Day7 진행 상황 불러오기
export const getWeekPlan = async () => {
  const response = await api.get('/plan/get')
  return response.data.data
}

// 오늘의 루틴 불러오기
export const getTodayRoutine = async (planId: number) => {
  const response = await api.get(`/list/get/${planId}`)
  return response.data.data
}

// 추천 운동 3가지 조회
export const getRecommendExercises = async () => {
  const { data } = await fitApi.get('/fit/exercise')
  return data.data as number[] // exerciseId 배열
}

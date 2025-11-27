// api 함수 정의
import { api } from './api'

// 이메일 중복 확인
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await api.post('/login', { loginId: email })
  return response.data.data.available // true 가입 X, false 가입 O
}

// 로컬 회원가입 (이메일, 비밀번호, 이름)
export const signupUser = async (email: string, password: string, name: string) => {
  await api.post('/login/join', {
    loginId: email,
    password,
    name,
  })
}

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

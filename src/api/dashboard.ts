// api 함수 정의
import { api } from './api'
import { fitApi } from './fitApi'

// 체력 진단 대시보드 정보 타입
export interface DashboardPayload {
  age: number
  bmi: number
  gender: 'M' | 'F'
  stamina: {
    balance: number
    chairSquat: number
    forwardFold: number
    plank: number
    pushUp: number
    stepTest: number
  }
}

// 체력 진단 대시보드 생성
export const postDashboard = async (payload: DashboardPayload) => {
  const response = await fitApi.post('/fit/score', payload)
  return response.data.data
}

// 대시보드 결과 타입
export type PersonaResponse = {
  name: string
  emoji: string
  description: string
  characteristics: string[]
  recommendation: string
}

export type AnalyzeResult = {
  perStrength: number
  perCardio: number
  perCore: number
  perFlexibility: number
  perAgility: number
  perBodyComposition: number
  averageScore: number
  personaResponse: PersonaResponse
  llmReport: string
}

// 대시보드 결과 불러오기
export const getAnalyzeResult = async (): Promise<AnalyzeResult> => {
  const response = await api.get('/analyze/get')
  return response.data.data
}

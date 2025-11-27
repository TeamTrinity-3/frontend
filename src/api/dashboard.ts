// api 함수 정의
import { fitApi } from './fitApi'

// 체력 측정 정보 타입
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

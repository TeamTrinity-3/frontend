// api 함수 정의
import { api } from './api'

// 건강 정보 타입
export interface HealthInfo {
  birth: string
  gender: string
  height: number
  weight: number
  proficiency: string
  place: string
  restrictAreas: string[]
}

// 건강 정보 조회
export const getHealthInfo = async (): Promise<HealthInfo | null> => {
  const response = await api.get('/health/get')
  return response.data.data
}

// 건강 정보 입력
export const createHealthInfo = async (payload: HealthInfo): Promise<void> => {
  await api.post('/health/info', payload)
}

// 건강 정보 수정
export const patchHealthInfo = async (payload: HealthInfo): Promise<HealthInfo> => {
  const response = await api.patch('/health/patch', payload)
  return response.data.data
}

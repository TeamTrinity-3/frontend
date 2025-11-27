// api 함수 정의
import { api } from './api'

// 체력 측정 정보 타입
export interface StaminaPayload {
  plank: number
  chairSquat: number
  pushUp: number
  stepTest: number
  forwardFold: number
  balance: number
}

// 체력 측정 결과 저장
export const postStamina = async (payload: StaminaPayload): Promise<void> => {
  await api.post('/stamina/save', payload)
}

// 체력 재측정 결과 업데이트
export const patchStamina = async (payload: StaminaPayload): Promise<void> => {
  await api.patch('/stamina/patch', payload)
}

// upsert : 먼저 patch 시도해서 404(정보 없음)면 post로 다시 저장
export const saveStaminaUpsert = async (payload: StaminaPayload): Promise<void> => {
  try {
    await patchStamina(payload)
  } catch (error: any) {
    const status = error?.response?.status
    const message = error?.response?.data?.message as string | undefined

    // 체력 정보가 존재하지 않는 경우
    if (status === 404 || message === '체력정보가 존재하지 않습니다.') {
      await postStamina(payload)
      return
    }

    throw error
  }
}

// api 함수 정의
import { api } from './api'

// 이메일 중복 확인
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await api.post('/login', { loginId: email })
  return response.data.data.available // true 가입 X, false 가입 O
}

// 이메일 인증
export const requestEmailAuth = async (email: string): Promise<string> => {
  const response = await api.post('/login/mail', { email })
  return response.data.data.authCode
}

// 로그인
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login/login', {
      loginId: email,
      password,
    })
    return response.data.data
  } catch (error) {
    console.error('로그인 요청 에러:', error)
    throw error
  }
}

// 로컬로 회원가입했는지 확인
export const getEmailProvider = async (email: string): Promise<string | null> => {
  const response = await api.post('/login', { loginId: email })
  return response.data.data.provider // "local" | "SNS" | null
}

// 비밀번호 변경
export const patchPassword = async (email: string, password: string) => {
  await api.patch('/login/passwordPatch', {
    loginId: email,
    password,
  })
}

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

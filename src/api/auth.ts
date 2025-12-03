// api 함수 정의
import { api } from './api'

// 이메일 중복 확인
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await api.post('/login', { loginId: email })
  return response.data.data.available
}

// 이메일 인증
export const requestEmailAuth = async (email: string): Promise<string> => {
  const response = await api.post('/login/mail', { email })
  return response.data.data.authCode
}

// 구글 로그인 - 토큰 발급
export const requestSocialAccessToken = async (tempCode: string) => {
  const response = await api.post('/login/accessToken', { tempCode })
  return response.data.data.token
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

// 로컬 회원가입 (이메일, 비밀번호, 이름)
export const signupUser = async (email: string, password: string, name: string) => {
  await api.post('/login/join', {
    loginId: email,
    password,
    name,
  })
}

// 로컬로 회원가입했는지 확인
export const getEmailProvider = async (email: string): Promise<string | null> => {
  const response = await api.post('/login', { loginId: email })
  return response.data.data.provider // local | SNS | null
}

// 비밀번호 변경
export const patchPassword = async (email: string, password: string) => {
  await api.patch('/login/passwordPatch', {
    loginId: email,
    password,
  })
}

// 회원탈퇴
export const deleteUser = async (): Promise<void> => {
  await api.delete('/user/delete')
}

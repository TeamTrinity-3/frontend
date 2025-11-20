import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/api/auth'

// 로그인 요청을 보내고, 받은 토큰을 로컬에 저장한다.
export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),

    onSuccess: (data: any) => {
      const { token } = data

      if (token) {
        const pureToken = token.replace('Bearer ', '')
        localStorage.setItem('token', pureToken)
      }
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error)
    },
  })
}

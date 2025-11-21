import { useMutation } from '@tanstack/react-query'
import { requestSocialAccessToken } from '@/api/auth'

export function useGoogleLogin() {
  return useMutation({
    mutationFn: requestSocialAccessToken,
  })
}

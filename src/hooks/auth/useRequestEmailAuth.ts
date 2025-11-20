import { useMutation } from '@tanstack/react-query'
import { requestEmailAuth } from '@/api/auth'

export const useRequestEmailAuth = () => {
  return useMutation({
    mutationFn: (email: string) => requestEmailAuth(email),
  })
}

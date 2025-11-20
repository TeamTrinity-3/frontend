import { useMutation } from '@tanstack/react-query'
import { patchPassword } from '@/api/auth'

export const usePatchPassword = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      patchPassword(email, password),
  })
}

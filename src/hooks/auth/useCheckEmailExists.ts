import { useMutation } from '@tanstack/react-query'
import { checkEmailExists } from '@/api/auth'

export function useCheckEmailExists() {
  return useMutation({
    mutationFn: (email: string) => checkEmailExists(email),
  })
}

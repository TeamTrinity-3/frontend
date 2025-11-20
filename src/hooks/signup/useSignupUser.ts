import { useMutation } from '@tanstack/react-query'
import { signupUser } from '@/api/user'

export const useSignupUser = () => {
  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      signupUser(email, password, name),
  })
}

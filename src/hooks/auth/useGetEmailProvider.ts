import { useMutation } from '@tanstack/react-query'
import { getEmailProvider } from '@/api/auth'

export const useGetEmailProvider = () => {
  return useMutation({
    mutationFn: (email: string) => getEmailProvider(email),
  })
}

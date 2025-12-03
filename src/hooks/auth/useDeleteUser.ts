import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '@/api/auth'

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: () => deleteUser(),
  })
}

import { useMutation } from '@tanstack/react-query'
import { generateRoutine } from '@/api/routine'

export const useGenerateRoutine = () => {
  return useMutation({
    mutationFn: generateRoutine,
  })
}

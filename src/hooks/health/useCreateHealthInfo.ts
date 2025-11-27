import { useMutation } from '@tanstack/react-query'
import { createHealthInfo, type HealthInfo } from '@/api/health'

export const useCreateHealthInfo = () => {
  return useMutation({
    mutationFn: (payload: HealthInfo) => createHealthInfo(payload),
  })
}

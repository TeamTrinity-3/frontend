import { useMutation } from '@tanstack/react-query'
import { patchHealthInfo, type HealthInfo } from '@/api/health'

export const useUpdateHealthInfo = () => {
  return useMutation<HealthInfo, unknown, HealthInfo>({
    mutationFn: patchHealthInfo,
  })
}

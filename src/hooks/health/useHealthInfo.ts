import { useQuery } from '@tanstack/react-query'
import { getHealthInfo, type HealthInfo } from '@/api/health'

export const useHealthInfo = () => {
  return useQuery<HealthInfo | null>({
    queryKey: ['healthInfo'],
    queryFn: getHealthInfo,
    staleTime: 1000 * 60 * 5,
  })
}

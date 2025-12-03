import { useQuery } from '@tanstack/react-query'
import { getTargetAreas, type TargetArea } from '@/api/search'

export const useTargetAreas = () => {
  return useQuery<TargetArea[]>({
    queryKey: ['targetArea'],
    queryFn: getTargetAreas,
  })
}

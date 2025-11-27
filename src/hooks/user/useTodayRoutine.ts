import { useQuery } from '@tanstack/react-query'
import { getTodayRoutine } from '@/api/user'

export const useTodayRoutine = (planId?: number) => {
  return useQuery({
    queryKey: ['todayRoutine', planId],
    queryFn: () => getTodayRoutine(planId!),
    enabled: !!planId,
  })
}

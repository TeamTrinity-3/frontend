import { useQuery } from '@tanstack/react-query'
import { getWeekPlan } from '@/api/user'

export const useWeekPlan = () => {
  return useQuery({
    queryKey: ['weekPlan'],
    queryFn: getWeekPlan,
  })
}

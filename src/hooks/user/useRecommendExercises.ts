import { useQuery } from '@tanstack/react-query'
import { getRecommendExercises } from '@/api/user'

export const useRecommendExercises = () => {
  return useQuery({
    queryKey: ['exercise', 'recommend3'],
    queryFn: getRecommendExercises,
    staleTime: 1000 * 60 * 30, // 30분
  })
}

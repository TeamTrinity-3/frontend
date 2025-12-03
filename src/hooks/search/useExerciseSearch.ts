import { useQuery } from '@tanstack/react-query'
import { searchExercises, type ExercisePage } from '@/api/search'

export const useExerciseSearch = (keyword: string, page = 0, size = 12) => {
  return useQuery<ExercisePage>({
    queryKey: ['exerciseSearch', keyword, page, size],
    queryFn: () => searchExercises(keyword, page, size),
  })
}

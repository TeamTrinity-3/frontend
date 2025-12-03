import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getExercises, type ExercisePage, type ExerciseSearchParams } from '@/api/search'

export const useExerciseList = (params: ExerciseSearchParams) => {
  return useQuery<ExercisePage>({
    queryKey: ['exercises', params],
    queryFn: () => getExercises(params),
    placeholderData: keepPreviousData,
  })
}

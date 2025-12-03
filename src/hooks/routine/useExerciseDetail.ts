import { useQuery } from '@tanstack/react-query'
import { getExerciseDetail, type ExerciseDetail } from '@/api/routine'

export const useExerciseDetail = (exerciseId?: number) => {
  return useQuery<ExerciseDetail>({
    queryKey: ['exerciseDetail', exerciseId],
    queryFn: () => getExerciseDetail(exerciseId as number),
    enabled: !!exerciseId, // id 있을 때만 호출
  })
}

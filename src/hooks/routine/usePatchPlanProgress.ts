import { useMutation } from '@tanstack/react-query'
import { patchPlanProgress } from '@/api/routine'

export const usePatchPlanProgress = () => {
  return useMutation({
    mutationFn: (planId: number) => patchPlanProgress(planId),
  })
}

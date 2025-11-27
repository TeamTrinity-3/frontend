import { useMutation } from '@tanstack/react-query'
import { postDashboard, type DashboardPayload } from '@/api/dashboard'

export const usePostDashboard = () => {
  return useMutation({
    mutationFn: (payload: DashboardPayload) => postDashboard(payload),
  })
}

import { useQuery } from '@tanstack/react-query'
import { getAnalyzeResult, type AnalyzeResult } from '@/api/dashboard'

export const ANALYZE_RESULT_QUERY_KEY = ['analyze', 'dashboard'] as const

export const useAnalyzeResult = () => {
  return useQuery<AnalyzeResult>({
    queryKey: ANALYZE_RESULT_QUERY_KEY,
    queryFn: getAnalyzeResult,
  })
}

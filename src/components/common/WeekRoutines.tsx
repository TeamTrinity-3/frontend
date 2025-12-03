import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useWeekPlan } from '@/hooks/user/useWeekPlan'
import { useGenerateRoutine } from '@/hooks/routine/useGenerateRoutine'
import { useHealthInfo } from '@/hooks/health/useHealthInfo'

type Plan = {
  planId: number
  day: number
  active: boolean
  progress: boolean
}

export default function WeekRoutines() {
  const queryClient = useQueryClient()
  const { data } = useWeekPlan()
  const { mutate: generateRoutine, isPending } = useGenerateRoutine()
  const { data: healthInfo, isLoading: healthLoading, isFetching: healthFetching } = useHealthInfo()

  const hasRequestedNewRoutine = useRef(false) // 새 루틴을 보냈는지 여부

  const currentDay = data?.currentDay ?? null
  const plans: Plan[] = data?.plans ?? []

  // currentDay가 -1이면 자동으로 루틴 생성
  useEffect(() => {
    if (healthLoading || healthFetching) return
    if (healthInfo === null) return

    if (currentDay !== -1 || !data || isPending || hasRequestedNewRoutine.current) return

    hasRequestedNewRoutine.current = true
    alert('🎉 7일 루틴을 모두 완료하셨습니다!\n새로운 루틴을 준비할게요!')

    generateRoutine(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['weekPlan'] })
        alert('💪 새로운 7일 루틴이 준비되었어요!\n계속 달려볼까요?')
      },
      onError: () => {
        alert('루틴 생성 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
      },
    })
  }, [
    currentDay,
    data,
    isPending,
    healthInfo,
    healthLoading,
    healthFetching,
    generateRoutine,
    queryClient,
  ])

  if (!data) return null

  // days 배열 생성
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = i + 1
    const plan = plans.find((p) => p.day === day)

    const isActive = !!plan?.active // 날이 열렸는지 여부
    const isDone = !!plan?.progress // 루틴 완료 여부
    const isToday = currentDay !== -1 && day === currentDay // 오늘인지 여부
    const isFuture = !isActive // 아직 오지 않은 날짜인지 여부

    return {
      label: `Day${day}`,
      isToday,
      isDone,
      isFuture,
    }
  })

  return (
    <section className='relative rounded-[10px] bg-white p-6 mb-8 max-[490px]:mb-5'>
      <h2 className='mb-5 text-center text-[14px] font-semibold'>7 Days routine</h2>

      <div className='flex items-center justify-center gap-4 max-[360px]:gap-3'>
        {days.map(({ label, isToday, isDone, isFuture }, i) => (
          <div key={i} className='flex flex-col items-center gap-2'>
            <span className={`text-[11px] font-semibold ${isToday ? 'text-[#3A6FA5]' : ''}`}>
              {label}
            </span>

            {isFuture ? (
              <span className='h-7 w-7 rounded-full bg-[#EFEFEF]' />
            ) : isToday ? (
              <span className='grid h-7 w-7 place-items-center rounded-full bg-[#468FAF] text-white'>
                {isDone && <Check size={15} />}
              </span>
            ) : isDone ? (
              <span className='grid h-7 w-7 place-items-center rounded-full bg-[#EFEFEF]'>
                <Check size={15} />
              </span>
            ) : (
              <span className='h-7 w-7 rounded-full bg-[#EFEFEF]' />
            )}
          </div>
        ))}
      </div>

      {/* 로딩 */}
      {isPending && currentDay === -1 && (
        <div
          className='absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col gap-3
                      justify-center items-center rounded-[10px] z-20'
        >
          <div className='animate-spin w-6 h-6 border-2 border-[#468FAF] border-t-transparent rounded-full' />
          <p className='text-[12px] font-medium text-[#468FAF]'>새로운 루틴을 준비하고 있어요...</p>
        </div>
      )}
    </section>
  )
}

import { Check } from 'lucide-react'
import { useWeekPlan } from '@/hooks/user/useWeekPlan'

type Plan = {
  day: number
  active: boolean
  progress: boolean
}

export default function WeekRoutines() {
  const { data } = useWeekPlan()
  if (!data) return null
  const { currentDay, plans } = data

  // days 배열 생성
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = i + 1
    const plan = plans.find((p: Plan) => p.day === day)

    const isActive = !!plan?.active // 날이 열렸는지 여부
    const isDone = !!plan?.progress // 루틴 완료 여부
    const isToday = day === currentDay // 오늘인지 여부
    const isFuture = !isActive // 아직 오지 않은 날짜인지 여부

    return {
      label: `Day${day}`,
      isToday,
      isDone,
      isFuture,
    }
  })

  return (
    <section className='rounded-[10px] bg-white p-6 mb-8 max-[490px]:mb-5'>
      <h2 className='mb-5 text-center text-[14px] font-semibold'>Week&apos;s routines</h2>

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
    </section>
  )
}

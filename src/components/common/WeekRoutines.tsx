import { Check } from 'lucide-react'

export default function WeekRoutines() {
  // 더미 데이터
  const today = 4 // 0=Day1 … 4=Day5(오늘)
  const done = [0, 1, 2, 3, 4] // 체크된 인덱스

  // days 배열 생성
  const days = Array.from({ length: 7 }, (_, i) => ({
    label: `Day${i + 1}`, // Day1~Day7
    isToday: i === today, // 오늘인지 여부
    isDone: done.includes(i), // 출석 완료 여부
    isFuture: i > today, // 아직 오지 않은 날짜인지 여부
  }))

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
                <Check size={15} />
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

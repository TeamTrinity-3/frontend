import { useEffect, useMemo, useRef } from 'react'
import { Clock } from 'lucide-react'

type Step = { label: string; time: string; sets?: number; active?: boolean }

type Props = {
  steps: Step[]
  activeIndex?: number
  onStop?: () => void // 그만할래요 버튼
  onFinish?: () => void // 루틴이 끝났을 때 호출
  className?: string
  image?: string | null
  title?: string
  description?: string
}

// 숫자를 두자리로 바꾸고 초로 변환
const pad2 = (n: number) => String(n).padStart(2, '0')
const timeToSec = (t: string) => {
  const [m, s] = t.split(':').map(Number)
  return (m || 0) * 60 + (s || 0)
}

export default function RoutineRunnerOrder({
  steps,
  activeIndex,
  onStop,
  onFinish,
  className = '',
  image,
  title,
  description,
}: Props) {
  // 항상 0번부터 시작
  const rawActive = typeof activeIndex === 'number' ? activeIndex : 0

  // 화면 하이라이트에 쓸 인덱스
  const visualActive = Math.min(Math.max(rawActive, 0), Math.max(steps.length - 1, 0))

  // 총 소요시간(sets 반영)
  const totalSec = useMemo(
    () => steps.reduce((sum, s) => sum + timeToSec(s.time) * (s.sets ?? 1), 0),
    [steps],
  )
  const totalText = `${Math.floor(totalSec / 60)}m ${pad2(totalSec % 60)}s`

  // 루틴이 끝나면 onFinish 호출
  const calledRef = useRef(false)
  useEffect(() => {
    if (!onFinish || calledRef.current) return
    if (rawActive >= steps.length && steps.length > 0) {
      calledRef.current = true
      onFinish()
    }
  }, [rawActive, steps.length, onFinish])

  return (
    <aside className={`rounded-[10px] bg-white p-6 w-full ${className}`}>
      {/* 이미지 */}
      <div className='h-36 max-[840px]:h-80 max-[600px]:h-36 w-full rounded-[10px] bg-[#ECEFF3] mb-4 overflow-hidden'>
        {image && <img src={image} alt={title} className='h-full w-full object-cover' />}
      </div>

      {/* 텍스트/아이콘 오버레이 */}
      <div className='text-[14px] font-semibold'>{title}</div>
      <div className='mt-1 text-[12px] text-[#7B7B7B]'>{description}</div>
      <div className='mt-3 ml-1 flex items-center gap-2 text-[12px] font-semibold'>
        <Clock size={15} />
        <span>{totalText}</span>
      </div>

      <hr className='mt-4 mb-4 border-t-[1.5px] border-[#ECECEC]' />

      {/* 제목 */}
      <h3 className='text-[14px] font-semibold mb-3'>운동 진행 순서</h3>

      {/* 진행 순서 */}
      <div className='space-y-2 mb-5'>
        {steps.map((s, i) => {
          const active = i === visualActive
          const sec = timeToSec(s.time) * (s.sets ?? 1)
          const time = `(${pad2(Math.floor(sec / 60))}:${pad2(sec % 60)})`
          return (
            <div
              key={`${s.label}-${i}`}
              className={`flex items-center justify-between rounded-[10px] px-3 py-2 border
              ${active ? 'bg-[#EAF5FB] border-[#C7E2EF]' : 'bg-white border-[#ECECEC]'}
            `}
            >
              <div className='flex items-center gap-3 font-medium'>
                <span className='h-7 w-7 rounded-full bg-[#A8D6E5] text-[13px] font-semibold grid place-items-center'>
                  {i + 1}
                </span>
                <span className='text-[13px]'>
                  {s.label} <span className='text-[#7B7B7B]'>{time}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 그만할래요 버튼 */}
      <button
        type='button'
        onClick={onStop}
        className='mt-2 mb-1 h-10 w-full px-6 rounded-[10px] text-[13px] text-white transition-colors bg-[#FF0000] hover:bg-[#E60000] cursor-pointer'
        aria-label='그만할래요'
      >
        그만할래요
      </button>
    </aside>
  )
}

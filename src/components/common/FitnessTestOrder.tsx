import { useState } from 'react'

type Step = { label: string; time: string; active?: boolean }

type Props = {
  steps?: Step[]
  disabled?: boolean // 측정 중이면 버튼 비활성화
  timerDone?: boolean // 타이머가 끝났는지 여부
  onStart: () => void // 측정 시작 클릭 시 호출(부모에서 Timer 시작)
  onStepChange?: (idx: number) => void // 다음 단계로 이동할 때 호출
  onFinish?: () => void // 테스트가 끝났을 때 호출
  className?: string
}

export default function FitnessTestOrder({
  steps = [
    { label: '복식호흡', time: '00:30', active: true },
    { label: '스쿼트', time: '00:31' },
    { label: '플랭크', time: '00:32' },
  ],
  disabled = false,
  timerDone = false,
  onStart,
  onStepChange,
  onFinish,
  className = '',
}: Props) {
  // 처음에 몇 번째 step을 활성화할지 정해서 activeIdx 상태에 넣음
  const [activeIdx, setActiveIdx] = useState(() => {
    const i = steps.findIndex((s) => s.active) // active: true의 인덱스 반환, 없으면 -1
    return i >= 0 ? i : 0 // 인덱스가 없으면 첫 단계부터 시작
  })

  const [reps, setReps] = useState<number | ''>('') // 입력 중인 횟수
  const [doneReps, setDoneReps] = useState<Record<number, number>>({}) // 단계별로 기록된 횟수
  const [finished, setFinished] = useState(false) // 마지막 단계 완료 여부

  const isLast = activeIdx >= steps.length - 1
  const canGoNext = timerDone && reps !== '' && !finished

  const handleNextStep = () => {
    if (!canGoNext) return

    const repsNum = Number(reps)
    setDoneReps((prev) => ({ ...prev, [activeIdx]: repsNum }))
    setReps('')

    if (isLast) {
      setFinished(true)
      return
    }

    const next = activeIdx + 1
    setActiveIdx(next)
    setFinished(false)
    onStepChange?.(next)
  }

  return (
    <aside className={`rounded-[10px] bg-white p-6 w-full ${className}`}>
      {/* 이미지 자리, h는 이미지 비율대로 되도록 수정*/}
      <div className='h-36 max-[840px]:h-80 max-[600px]:h-36 w-full rounded-[10px] bg-[#ECEFF3] mb-5' />

      <hr className='mb-4 border-t-[1.5px] border-[#ECECEC]' />

      {/* 제목 */}
      <h3 className='text-[15px] font-semibold mb-3'>체력 측정 진행 순서</h3>

      {/* 진행 순서 */}
      <div className='space-y-2 mb-5'>
        {steps.map((s, i) => {
          const active = i === activeIdx
          const recorded = doneReps[i] // 완료 후 기록된 횟수
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
                  {s.label} <span className='text-[#7B7B7B]'>({s.time}) </span>
                </span>
              </div>

              <span className='text-[13px] font-medium shrink-0 whitespace-nowrap'>
                {recorded !== undefined ? `${recorded}회` : ''}
              </span>
            </div>
          )
        })}
      </div>

      {/* 횟수 입력 */}
      <div className='mb-3'>
        <p className='text-sm font-semibold mb-2'>시간 내에 몇 회 진행하셨나요?</p>
        <div className='flex justify-end items-center gap-2'>
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            value={reps}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '')
              setReps(v === '' ? '' : Number(v))
            }}
            className='h-6 w-11 bg-[#EFEFEF] px-1 text-[13px]'
          />
          <span className='text-[13px] font-medium'>회</span>
        </div>
      </div>

      {/* 측정 시작 버튼 / 체력 측정 완료 버튼 */}
      {finished ? (
        <button
          type='button'
          onClick={onFinish}
          className='mt-2 h-10 w-full px-6 rounded-[10px] text-[13px] text-white bg-[#468FAF] cursor-pointer'
          aria-label='체력 측정 완료'
        >
          체력 측정 완료
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            setFinished(false)
            onStart()
          }}
          disabled={disabled}
          className={`mt-2 h-10 w-full px-6 rounded-[10px] text-[13px] text-white transition-colors cursor-pointer
          ${disabled ? 'bg-[#888888] cursor-not-allowed' : 'bg-[#FF0000] hover:bg-[#E60000]'}
        `}
        >
          측정 시작
        </button>
      )}

      {/* 다음 */}
      <p className='mt-3 text-[12px] font-medium'>
        횟수를 입력하고 다음 버튼을 눌러 계속 진행해주세요.
      </p>
      <div className='mt-3 text-right'>
        <button
          type='button'
          onClick={handleNextStep}
          disabled={!canGoNext}
          className={`text-[13px] font-semibold 
            ${
              !canGoNext
                ? 'text-[#888888] cursor-not-allowed'
                : 'cursor-pointer hover:underline underline-offset-3 decoration-1'
            }
        `}
        >
          다음 단계로 &gt;
        </button>
      </div>
    </aside>
  )
}

import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  totalSec?: number // 총 운동 시간(s)
  autoStart?: boolean // 자동 시작 여부
  start?: number // 버튼 클릭 시 숫자 증가하며 시작
  size?: number // 원 지름(px)
  stroke?: number // 원 두께(px)
  onComplete?: () => void // 완료 시 콜백
  className?: string
}

export default function Timer({
  // 타이머 기본값
  totalSec = 180,
  autoStart = false,
  start = 0,
  size = 400,
  stroke = 15,
  onComplete,
  className = '',
}: TimerProps) {
  const totalMs = Math.max(0, Math.floor(totalSec * 1000)) // s >> ms
  const [leftMs, setLeftMs] = useState<number>(totalMs) // 남은 시간(ms)
  const [snap, setSnap] = useState(false) // 리셋 프레임에 transition 끄기

  const endAtRef = useRef<number | null>(null) // 종료 시각
  const rafRef = useRef<number | null>(null) // rAF id
  const runningRef = useRef<boolean>(false) // 실행 중 여부

  // 진행 원 DOM 레퍼런스(직접 업데이트)
  const progRef = useRef<SVGCircleElement | null>(null)

  // 원형 진행도 계산
  const radius = Math.max(0, (size - stroke) / 2)

  // 시간 포맷 (m:ss)
  const fmt = (ms: number) => {
    const sec = Math.max(0, Math.ceil(ms / 1000))
    const m = Math.floor(sec / 60)
    const s = (sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // 진행 중인 requestAnimationFrame 루프 중지
  const stopRAF = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  // 링 오프셋 직접 반영 (0~100)
  const setRingPct = (pct: number) => {
    if (progRef.current) {
      // 스냅 프레임에서 transition 제거
      progRef.current.style.transition = snap ? 'none' : 'stroke-dashoffset 0.12s linear'
      progRef.current.style.strokeDashoffset = String(Math.min(100, Math.max(0, pct)))
    }
  }

  // 틱 루프 : 남은 시간을 절대 시각(종료-현재)으로 계산, rAF로 갱신
  const tick = () => {
    rafRef.current = requestAnimationFrame(() => {
      if (!runningRef.current || endAtRef.current === null) return
      const left = Math.max(0, endAtRef.current - Date.now())
      setLeftMs(left)

      // 진행률을 직접 계산해서 링 업데이트
      const progress = totalMs === 0 ? 1 : 1 - left / totalMs // 0 > 1
      setRingPct(progress * 100)

      if (left <= 0) {
        runningRef.current = false
        stopRAF()
        onComplete?.()
        return
      }
      tick()
    })
  }

  // 시작 핸들러
  const handleStart = () => {
    // 기존 애니메이션 정리
    runningRef.current = false
    stopRAF()

    // 스냅 프레임으로 원 채우기
    setSnap(true)
    setLeftMs(totalMs)
    endAtRef.current = null
    setRingPct(0) // 0% = full, 100% = empty

    // 다음 프레임에서 카운트다운 시작
    requestAnimationFrame(() => {
      setSnap(false)
      runningRef.current = true
      endAtRef.current = Date.now() + totalMs
      requestAnimationFrame(() => tick())
    })
  }

  // 자동 시작
  useEffect(() => {
    if (autoStart) handleStart()
    return () => stopRAF()
  }, [autoStart])

  // start 신호로 시작
  useEffect(() => {
    if (start > 0) handleStart()
  }, [start])

  // 다음 단계, 실행 전이면 full로 보이도록
  useEffect(() => {
    if (!runningRef.current) {
      setLeftMs(totalMs)
      setRingPct(0)
    }
  }, [totalMs])

  return (
    <>
      <div
        className={`w-full rounded-[10px] bg-[#EAEAEF] p-13 max-[980px]:px-8 max-[980px]:py-20 flex flex-col items-center ${className}`}
      >
        {/* 원형 타이머 */}
        <div className='relative' style={{ width: size, height: size }}>
          <svg width={size} height={size} className='-rotate-90 transform' aria-label='운동 타이머'>
            {/* 배경 원 */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke='#c4c4c4ff'
              strokeWidth={stroke}
              fill='none'
            />
            {/* 진행 원 */}
            <circle
              ref={progRef}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke='#468FAF'
              strokeWidth={stroke}
              fill='none'
              strokeLinecap='round'
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={0}
            />
          </svg>

          {/* 총 운동 시간 */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-8/2 max-[980px]:mt-7 select-none'>
            <span className='text-xl max-[980px]:text-lg text-[#7B7B7B] font-bold'>
              {fmt(totalMs)}
            </span>
          </div>

          {/* 남은 시간 */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none'>
            <span className='text-6xl max-[980px]:text-4xl font-extrabold'>{fmt(leftMs)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

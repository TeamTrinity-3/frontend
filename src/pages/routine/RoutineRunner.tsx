// @ts-nocheck
import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './RoutineRunner.styles'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import Fiti from '@/components/common/Fiti'
import Timer from '@/components/common/Timer'
import SetBadge from '@/components/common/SetBadge'
import Tips from '@/components/common/Tips'
import RoutineRunnerOrder from '@/components/common/RoutineRunnerOrder'
import RoutineCompleteModal from '@/components/common/RoutineCompleteModal'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useUserProfile } from '@/hooks/user/useUserProfile'
import defaultProfile from '@/assets/Images/profile.svg'

const STEPS = [
  { label: '복식호흡', time: '00:20', sets: 1 },
  { label: '스쿼트', time: '00:21', sets: 3 },
  { label: '플랭크', time: '00:22', sets: 2 },
  { label: '팔굽혀펴기', time: '00:23', sets: 2 },
]

// 문자열 -> second 변환
const timeToSec = (t: string) => {
  const [m, s] = t.split(':').map(Number)
  return (m || 0) * 60 + (s || 0)
}

export default function RoutineRunner() {
  const navigate = useNavigate()

  const { data: user } = useUserProfile() // 이름, 프로필 조회
  const profileSrc = user?.picture ?? defaultProfile // 프로필 없으면 기본 이미지

  const [showComplete, setShowComplete] = useState(false)
  useEffect(() => setShowComplete(true), [])

  // 980px이하 여부
  const isLt980 = useBreakpoint('(max-width: 980px)')
  const timerSize = isLt980 ? 280 : 400
  const timerStroke = isLt980 ? 12 : 15

  const [isTTS, setIsTTS] = useState(false) // TTS 재생 중이면 true

  const [activeIdx, setActiveIdx] = useState(0) // 현재 스텝(항상 0부터 시작)
  const [currentSet, setCurrentSet] = useState(0) // 현재 스텝의 진행 세트(표시만; 로직은 추후)
  const [isCounting, setIsCounting] = useState(false) // 측정 중 여부
  const [timerDone, setTimerDone] = useState(false) // 타이머 완료 여부
  const [startSignal, setStartSignal] = useState(0) // Timer에게 시작 신호

  const finished = activeIdx >= STEPS.length
  const current = STEPS[activeIdx] // 현재 단계
  //   const current  = finished ? null : STEPS[activeIdx]

  // 타이머는 세트당 시간으로 동작
  const perSetSec = useMemo(() => (current ? timeToSec(current.time) : 0), [current?.time])

  // 스텝이 바뀌면 세트/타이머 상태 초기화
  useEffect(() => {
    setCurrentSet(0)
    setIsCounting(false)
    setTimerDone(false)
  }, [activeIdx])

  // 측정 시작 핸들러
  const handleStart = () => {
    if (finished || !current) return
    setIsCounting(true)
    setTimerDone(false)
    setStartSignal((n) => n + 1)
  }

  return (
    <>
      <SidebarProvider>
        <div className='max-[1400px]:hidden'>
          <AppSidebar logoOnly />
        </div>

        <SidebarInset>
          <div className={s.layout}>
            {/* 가짜 사이드바 (공간 채우기용) */}
            <div className={s.fakeSidebar} />

            {/* 메인 */}
            <main className={s.main}>
              {/* 헤더 */}
              <div className={s.header}>
                <div>
                  <h1 className={s.title}>Today's routines</h1>
                </div>
                <img
                  src={profileSrc}
                  alt='프로필'
                  className='h-11 w-11 rounded-full max-[840px]:hidden'
                />
              </div>

              <div className={s.timerWrap}>
                {/* set badge */}
                <div className='absolute left-4 top-4 z-10 flex flex-col gap-3'>
                  {/* 완료한 스텝 */}
                  {STEPS.slice(0, activeIdx).map((step) => (
                    <SetBadge key={step.label} className='justify-between w-[120px] opacity-65'>
                      <span className='truncate'>{step.label}</span>
                      <span className='ml-3 tabular-nums'>
                        {step.sets}/{step.sets}
                      </span>
                    </SetBadge>
                  ))}

                  {/* 현재 스텝 (진행 숫자는 나중에 수정) */}
                  <SetBadge className='justify-between w-[120px]'>
                    <span className='truncate'>{current.label}</span>
                    <span className='ml-3 tabular-nums'>0/{current.sets}</span>
                  </SetBadge>
                </div>

                {isTTS ? (
                  <Fiti />
                ) : (
                  <Timer
                    totalSec={perSetSec}
                    start={startSignal}
                    size={timerSize}
                    stroke={timerStroke}
                    onComplete={() => {
                      setIsCounting(false)
                      setTimerDone(true)
                    }}
                  />
                )}
              </div>

              <Tips
                title='Tip💡'
                items={[
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      호흡을 일정하게 유지하세요.
                    </span>{' '}
                    <br className='hidden max-[490px]:block' />
                    힘을 쓸 때는 내쉬고, 힘을 풀 때는 들이마시는게 기본입니다.
                  </>,
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      자세를 우선으로 하세요.
                    </span>{' '}
                    <br className='hidden max-[490px]:block' />
                    무게나 횟수보다 올바른 자세를 유지하는 것이 중요합니다.
                  </>,
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      꾸준함이 최고의 무기입니다.
                    </span>{' '}
                    <br className='hidden max-[490px]:block' />
                    짧게라도 매일 반복하는 습관이 체력과 건강을 만듭니다.
                  </>,
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      수분 섭취를 잊지 마세요.
                    </span>{' '}
                    <br className='hidden max-[490px]:block' />
                    땀을 흘리면 체내 수분과 전해질이 줄어듭니다.
                  </>,
                ]}
              />
            </main>

            {/* 오른쪽 400px 패널 */}
            <aside className={s.aside}>
              <RoutineRunnerOrder
                steps={STEPS}
                activeIndex={activeIdx}
                onFinish={() => navigate('/home')}
              />
            </aside>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* <RoutineCompleteModal open={showComplete} onClose={() => setShowComplete(false)} /> */}
    </>
  )
}

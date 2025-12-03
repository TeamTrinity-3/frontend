// @ts-nocheck
import { useMemo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useTodayRoutine } from '@/hooks/user/useTodayRoutine'
import { useExerciseDetail } from '@/hooks/routine/useExerciseDetail'
import { speak, stopSpeak } from '@/utils/tts'
import { playExerciseIntro } from '@/utils/exerciseTTS'

type ExerciseItem = {
  exerciseId: number
  sequence: number
  exerciseName: string
  totalSec: number
}

// 초 >> mm:ss
const formatTime = (sec: number) => {
  const min = Math.floor(sec / 60)
  const rem = sec % 60
  return `${String(min).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
}

export default function RoutineRunner() {
  const navigate = useNavigate()
  const { planId } = useParams() // url에서 planId 가져오기
  const numericPlanId = Number(planId)

  const { data: user } = useUserProfile() // 이름, 프로필 조회
  const profileSrc = user?.picture ?? defaultProfile // 프로필 없으면 기본 이미지

  // 오늘의 루틴 불러오기
  const { data: todayRoutine } = useTodayRoutine(numericPlanId)
  if (!todayRoutine) return null

  const rawList = (todayRoutine.listResponses ?? []) as ExerciseItem[]

  // sequence대로 정렬된 운동 진행 순서
  const exercises = useMemo(
    () => rawList.slice().sort((a, b) => a.sequence - b.sequence),
    [rawList],
  )

  // STEPS : label, time, sets
  const STEPS = useMemo(
    () =>
      exercises.map((item) => ({
        exerciseId: item.exerciseId,
        label: item.exerciseName,
        time: formatTime(item.totalSec), // mm:ss
      })),
    [exercises],
  )

  // 운동 완료하면 뜨는 모달
  const [showComplete, setShowComplete] = useState(false)

  // 980px이하 여부
  const isLt980 = useBreakpoint('(max-width: 980px)')
  const timerSize = isLt980 ? 280 : 400
  const timerStroke = isLt980 ? 12 : 15

  // 진행 상태
  const [activeIdx, setActiveIdx] = useState(0) // 현재 스텝(항상 0부터 시작)
  const [isTTS, setIsTTS] = useState(true) // TTS 재생 중이면 true
  const [currentSet, setCurrentSet] = useState(1) // 현재 세트 (1부터 시작)
  const [isRest, setIsRest] = useState(false) // false: 운동, true: 휴식
  const [isCounting, setIsCounting] = useState(false) // 측정 중 여부
  const [timerDone, setTimerDone] = useState(false) // 타이머 완료 여부
  const [startSignal, setStartSignal] = useState(0) // Timer에게 시작 신호

  const finished = activeIdx >= STEPS.length
  const currentStep = finished ? null : STEPS[activeIdx] // 현재 단계

  // 현재 STEP의 exerciseId로 운동 세부 내용 불러오기
  const currentExercise = exercises[activeIdx]
  const currentExerciseId = currentExercise?.exerciseId
  const { data: exerciseDetail } = useExerciseDetail(currentExerciseId)
  const currentSets = exerciseDetail?.sets ?? 1
  const [finishedSets, setFinishedSets] = useState<Record<number, number>>({})

  // 운동/휴식에 따라 타이머 시간 선택
  const currentTimerSec = useMemo(() => {
    if (!exerciseDetail) return 0
    return isRest ? exerciseDetail.restSec : exerciseDetail.durationSec
  }, [exerciseDetail, isRest])

  // 처음/운동 바뀔 때 TTS >> 끝나면 1세트 운동 시작
  useEffect(() => {
    if (!exerciseDetail) return

    // 운동 1세트 시작
    setIsTTS(true) // TTS 중에 Fiti 표시
    setIsCounting(false) // 타이머 멈춤
    setTimerDone(false)
    setCurrentSet(1)
    setIsRest(false)

    playExerciseIntro(exerciseDetail, () => {
      // TTS 끝난 후 >> 운동 1세트 타이머 시작
      setIsTTS(false) // Timer 표시
      setIsCounting(true) // 카운트 시작
      setStartSignal((n) => n + 1) // Timer 다시 시작시키는 신호
    })
  }, [exerciseDetail])

  // 스텝이 바뀌면 세트/타이머 상태 초기화
  useEffect(() => {
    setCurrentSet(1)
    setIsRest(false)
    setIsCounting(false)
    setTimerDone(false)
  }, [activeIdx])

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
                  {STEPS.slice(0, activeIdx).map((step) => {
                    const sets = finishedSets[step.exerciseId] ?? 1
                    return (
                      <SetBadge key={step.label} className='justify-between w-[120px] opacity-65'>
                        <span className='truncate'>{step.label}</span>
                        <span className='ml-3 tabular-nums'>
                          {sets}/{sets}
                        </span>
                      </SetBadge>
                    )
                  })}

                  {/* 현재 스텝 */}
                  {currentStep && (
                    <SetBadge className='justify-between w-[120px]'>
                      <span className='truncate'>{currentStep.label}</span>
                      <span className='ml-3 tabular-nums'>
                        {currentSet}/{currentSets}
                      </span>
                    </SetBadge>
                  )}
                </div>

                {isTTS ? (
                  <Fiti />
                ) : (
                  <Timer
                    totalSec={currentTimerSec}
                    start={startSignal}
                    size={timerSize}
                    stroke={timerStroke}
                    onComplete={() => {
                      if (!exerciseDetail) return

                      const totalSets = exerciseDetail.sets ?? 1
                      const restSec = exerciseDetail.restSec ?? 0
                      const name = exerciseDetail.exerciseName

                      if (!isRest) {
                        if (currentSet >= totalSets) {
                          // 마지막 운동이 끝난 경우
                          const isLastExercise = activeIdx >= exercises.length - 1
                          if (isLastExercise) {
                            speak(`운동을 모두 완료했습니다. 수고하셨습니다.`)
                            setIsCounting(false)
                            setTimerDone(true)
                            setShowComplete(true) // 완료 모달 열기
                          } else {
                            // 다음 운동이 있는 경우
                            setFinishedSets((prev) => ({
                              ...prev,
                              [currentExerciseId]: totalSets, // 세트 수 기록
                            }))

                            speak(`${name} 운동을 완료했습니다.`)
                            setIsCounting(false)
                            setTimerDone(false)
                            setCurrentSet(1)
                            setIsRest(false)
                            setActiveIdx((idx) => idx + 1) // 다음 운동으로 이동
                          }
                          return
                        }

                        // 세트가 남았으면, 휴식으로 전환
                        speak(`${currentSet}세트가 끝났습니다. ${restSec}초 동안 휴식하세요.`)
                        setIsRest(true)
                        setIsCounting(true)
                        setStartSignal((n) => n + 1) // 휴식 타이머 시작
                      } else {
                        // 휴식이 끝나면, 다음 세트 운동 시작
                        const nextSet = currentSet + 1

                        speak(`휴식이 끝났습니다. ${nextSet}세트를 시작하겠습니다.`)
                        setIsRest(false)
                        setCurrentSet(nextSet)
                        setIsCounting(true)
                        setStartSignal((n) => n + 1) // 다음 세트 운동 타이머 시작
                      }
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
                onStop={() => {
                  if (
                    confirm(
                      '중간에 그만두시면 모든 진행 사항이 초기화됩니다.\n정말 그만하시겠습니까?',
                    )
                  ) {
                    stopSpeak()
                    navigate('/home')
                  }
                }}
                onFinish={() => navigate('/home')}
                image={todayRoutine.image}
                title={todayRoutine.title}
                description={todayRoutine.description}
              />
            </aside>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <RoutineCompleteModal
        open={showComplete}
        onClose={() => setShowComplete(false)}
        planId={numericPlanId}
      />
    </>
  )
}

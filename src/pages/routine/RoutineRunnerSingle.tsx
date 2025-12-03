// @ts-nocheck
import { useMemo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { s } from './RoutineRunnerSingle.styles'
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
import { useExerciseDetail } from '@/hooks/routine/useExerciseDetail'
import { speak, stopSpeak } from '@/utils/tts'
import { playExerciseIntro } from '@/utils/exerciseTTS'

// 초 >> mm:ss
const formatTime = (sec: number) => {
  const min = Math.floor(sec / 60)
  const rem = sec % 60
  return `${String(min).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
}

export default function RoutineRunnerSingle() {
  const navigate = useNavigate()
  const { exerciseId } = useParams() // url에서 exerciseId 가져오기

  const { data: user } = useUserProfile() // 이름, 프로필 조회
  const profileSrc = user?.picture ?? defaultProfile // 프로필 없으면 기본 이미지

  // 운동 하나 상세 정보 불러오기
  const { data: exerciseDetail } = useExerciseDetail(Number(exerciseId))

  // 980px이하 여부
  const isLt980 = useBreakpoint('(max-width: 980px)')
  const timerSize = isLt980 ? 280 : 400
  const timerStroke = isLt980 ? 12 : 15

  // 진행 상태
  const [currentSet, setCurrentSet] = useState(1) // 현재 세트 (1부터 시작)
  const [isRest, setIsRest] = useState(false) // false: 운동, true: 휴식
  const [isCounting, setIsCounting] = useState(false) // 측정 중 여부
  const [isTTS, setIsTTS] = useState(true) // TTS 재생 중이면 true
  const [startSignal, setStartSignal] = useState(0) // Timer에게 시작 신호
  const [showComplete, setShowComplete] = useState(false) // 운동 완료하면 뜨는 모달

  // 정리 변수
  const totalSets = exerciseDetail?.sets ?? 1
  const restSec = exerciseDetail?.restSec ?? 0
  const durationSec = exerciseDetail?.durationSec ?? 0
  const currentTimerSec = isRest ? restSec : durationSec // 현재 타이머 시간

  // 운동 하나만 실행하는 리스트 구성
  const exercises = useMemo(() => {
    if (!exerciseDetail) return []

    const totalSec = durationSec * totalSets + restSec * (totalSets - 1)

    return [
      {
        exerciseId: Number(exerciseId),
        exerciseName: exerciseDetail.exerciseName,
        sequence: 1,
        totalSec,
      },
    ]
  }, [exerciseDetail, exerciseId, durationSec, totalSets, restSec])

  // STEPS : exerciseId, label, time
  const STEPS = useMemo(
    () =>
      exercises.map((item) => ({
        exerciseId: item.exerciseId,
        label: item.exerciseName,
        time: formatTime(item.totalSec), // mm:ss
      })),
    [exerciseDetail],
  )

  // 운동 시작 TTS >> 끝나면 타이머 시작
  useEffect(() => {
    if (!exerciseDetail) return

    setIsTTS(true)
    setIsCounting(false)
    setCurrentSet(1)
    setIsRest(false)

    playExerciseIntro(exerciseDetail, () => {
      setIsTTS(false)
      setIsCounting(true)
      setStartSignal((n) => n + 1)
    })
  }, [exerciseDetail])

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
                  <h1 className={s.title}>{exerciseDetail?.exerciseName ?? '운동 로딩 중...'}</h1>
                </div>
                <img
                  src={profileSrc}
                  alt='프로필'
                  className='h-11 w-11 rounded-full max-[840px]:hidden'
                />
              </div>

              <div className={s.timerWrap}>
                {/* set badge */}
                {exerciseDetail && (
                  <div className='absolute left-4 top-4 z-10 flex flex-col gap-3'>
                    {/* 현재 스텝 */}
                    <SetBadge className='justify-between w-[120px]'>
                      <span className='truncate'>{exerciseDetail.exerciseName}</span>
                      <span className='ml-3 tabular-nums'>
                        {currentSet}/{totalSets}
                      </span>
                    </SetBadge>
                  </div>
                )}

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

                      if (!isRest) {
                        // 운동 끝
                        if (currentSet >= totalSets) {
                          speak(`운동을 모두 완료했습니다. 수고하셨습니다.`)
                          setIsCounting(false)
                          setShowComplete(true)
                          return
                        }

                        // 세트가 남았으면, 휴식으로 전환
                        speak(`${currentSet}세트가 끝났습니다. ${restSec}초 휴식하세요.`)
                        setIsRest(true)
                        setIsCounting(true)
                        setStartSignal((n) => n + 1)
                      } else {
                        // 휴식이 끝나면, 다음 세트 운동 시작
                        speak(`휴식이 끝났습니다. ${currentSet + 1}세트를 시작하겠습니다.`)
                        setIsRest(false)
                        setCurrentSet((s) => s + 1)
                        setIsCounting(true)
                        setStartSignal((n) => n + 1)
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
                activeIndex={0}
                onStop={() => {
                  if (confirm('운동을 그만하시겠습니까?')) {
                    stopSpeak()
                    navigate('/home')
                  }
                }}
                onFinish={() => navigate('/home')}
                image={exerciseDetail?.image ?? undefined}
                title={exerciseDetail?.exerciseName ?? ''}
                description={exerciseDetail?.intro ?? ''}
              />
            </aside>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <RoutineCompleteModal open={showComplete} onClose={() => setShowComplete(false)} />
    </>
  )
}

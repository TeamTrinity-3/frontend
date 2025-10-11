import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './FitnessTest.styles'
import TestGuideModal from '@/components/common/TestGuideModal'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import Timer from '@/components/common/Timer'
import StepBadge from '@/components/common/StepBadge'
import Tips from '@/components/common/Tips'
import FitnessTestOrder from '@/components/common/FitnessTestOrder'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const STEPS = [
  { label: '복식호흡', time: '00:30' },
  { label: '스쿼트', time: '00:31' },
  { label: '플랭크', time: '00:32' },
]

// 문자열 -> second 변환
const timeToSec = (t: string) => {
  const [m, s] = t.split(':').map(Number)
  return (m || 0) * 60 + (s || 0)
}

export default function FitnessTest() {
  const navigate = useNavigate()

  // 안내 사항 모달
  const [showGuide, setShowGuide] = useState(false)
  useEffect(() => {
    setShowGuide(true)
  }, [])

  // 980px이하 여부
  const isLt980 = useBreakpoint('(max-width: 980px)')
  const timerSize = isLt980 ? 280 : 400
  const timerStroke = isLt980 ? 12 : 15

  const [activeIdx, setActiveIdx] = useState(0) // 활성화될 단계
  const [isCounting, setIsCounting] = useState(false) // 측정 시작 버튼 비활성화 제어
  const [timerDone, setTimerDone] = useState(false) // 타이머 완료 후에만 다음 가능
  const [startSignal, setStartSignal] = useState(0) // Timer에게 시작 신호

  const current = STEPS[activeIdx] // 현재 단계
  const totalSec = useMemo(() => timeToSec(current.time), [current.time]) // 현재 단계 총 소요 시간

  // 측정 시작 핸들러
  const handleStart = () => {
    setIsCounting(true)
    setTimerDone(false)
    setStartSignal((n) => n + 1) // Timer에게 시작 신호
  }

  return (
    <>
      {/* 체력 측정 전 안내 사항 */}
      <TestGuideModal
        open={showGuide}
        onClose={() => setShowGuide(false)}
        onStart={() => {
          setShowGuide(false)
        }}
      />

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
              <h1 className={s.title}>체력측정</h1>

              <div className={s.timerWrap}>
                <StepBadge className='absolute left-4 top-4 z-10'>
                  {activeIdx + 1}단계 - {current.label}
                </StepBadge>
                <Timer
                  totalSec={totalSec}
                  start={startSignal}
                  size={timerSize}
                  stroke={timerStroke}
                  onComplete={() => {
                    setIsCounting(false)
                    setTimerDone(true)
                  }}
                />
              </div>

              <Tips
                title='집중❗'
                items={[
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      제한 시간 동안 동작을 <span className='text-[#FF0004]'>몇 회</span> 하셨는지
                      기억해주세요.
                    </span>{' '}
                    <br className='hidden max-[490px]:block' />
                    정확히 기억하지 못하실 경우 대략적인 횟수라도 적어주세요.
                  </>,
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      자세를 우선으로 하세요.
                    </span>
                    <br className='hidden max-[490px]:block' />
                    무게나 횟수보다 올바른 자세를 유지하는 것이 중요합니다.
                  </>,
                  <>
                    <span className='font-bold max-[490px]:whitespace-nowrap'>
                      수분 섭취를 잊지 마세요.
                    </span>
                    <br className='hidden max-[490px]:block' />
                    땀을 흘리면 체내 수분과 전해질이 줄어듭니다.
                  </>,
                ]}
              />
            </main>

            {/* 오른쪽 400px 패널 */}
            <aside className={s.aside}>
              <FitnessTestOrder
                steps={STEPS}
                disabled={isCounting}
                timerDone={timerDone}
                onStart={handleStart}
                onStepChange={(idx) => setActiveIdx(idx)}
                onFinish={() => navigate('/fitness/test/loading')}
              />
            </aside>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

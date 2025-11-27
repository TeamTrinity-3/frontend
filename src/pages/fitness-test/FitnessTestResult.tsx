import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useUserProfile } from '@/hooks/user/useUserProfile'

export default function FitnessTestResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useBreakpoint('(max-width: 768px)')

  const { data: user } = useUserProfile() // 이름, 프로필 조회
  const userName = user?.name

  const result = location.state as
    | {
        user_info: {
          gender: 'M' | 'F'
          age: number
          bmi: number
          age_group: string
        }
        average_score: number
        percentiles: Record<
          string,
          {
            percentile: number
          }
        >
        persona: {
          name: string
          emoji: string
          description: string
          characteristics: string[]
          recommendation: string
        }
        llm_report: string
      }
    | undefined

  // state가 없으면 다시 측정 페이지로
  useEffect(() => {
    if (!result) {
      navigate('/fitness/test')
    }
  }, [result, navigate])

  if (!result) {
    return null
  }

  const { user_info, average_score, percentiles, persona, llm_report } = result

  // 성별을 한글로 변환
  const genderKo = user_info.gender === 'F' ? '여성' : '남성'

  // 차트 데이터
  const chartData = useMemo(
    () => [
      { label: '코어', v: percentiles['코어']?.percentile ?? 0 },
      { label: '근력', v: percentiles['근력']?.percentile ?? 0 },
      { label: '민첩성', v: percentiles['민첩성']?.percentile ?? 0 },
      { label: '심폐지구력', v: percentiles['심폐지구력']?.percentile ?? 0 },
      { label: '유연성', v: percentiles['유연성']?.percentile ?? 0 },
      { label: '체성분', v: percentiles['체성분']?.percentile ?? 0 },
    ],
    [percentiles],
  )

  // LLM 리포트 문단 나누기
  const reportParagraphs = llm_report.split('\n').filter((p) => p.trim().length > 0)

  return (
    <main className='min-h-svh px-2 py-8 md:px-5 md:py-30 xl:py-35'>
      <div className='mx-auto max-w-5xl'>
        {/* 제목 */}
        <h1 className='text-base font-semibold md:text-lg md:mb-4'>
          {userName} 님의 체력 진단 보드📋
        </h1>

        {/* 내용(2컬럼) */}
        <section className='grid grid-cols-1 md:grid-cols-2 xl:gap-8 items-start'>
          {/* 분석 차트 */}
          <div className='md:pt-12 xl:pt-0'>
            <div className='h-[300px] md:h-[380px] xl:h-[500px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <RadarChart
                  data={chartData}
                  cx='50%'
                  cy={isMobile ? '54%' : '50%'}
                  outerRadius={isMobile ? '85%' : '75%'}
                >
                  <PolarGrid gridType='polygon' />
                  <PolarAngleAxis
                    dataKey='label'
                    tick={{ fontSize: 12, fill: '#000', fontWeight: 500 }}
                  />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar
                    name='score'
                    dataKey='v'
                    stroke='#468FAF'
                    fill='#28B5E1'
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 분석 내용 */}
          <article className='p-2 sm:p-6'>
            <h2 className='text-[15px] font-semibold mb-5 md:text-base lg:mb-7'>
              {userName} 님은 {persona.name} {persona.emoji}
            </h2>

            <div className='space-y-3 text-[13px] leading-6 md:text-[14px] lg:space-y-5'>
              {/* 페르소나 설명 */}
              <p>{persona.description}</p>

              <p className='font-medium'>
                {userName} 님은 {user_info.age_group} {genderKo} / BMI {user_info.bmi.toFixed(1)}
                이며, 평균 백분위는 {average_score.toFixed(1)}% 입니다.
              </p>

              {/* LLM 리포트 (문단별) */}
              {reportParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className='mt-7 flex justify-end lg:mt-10'>
              <button
                type='button'
                onClick={() => navigate('/home')}
                className='px-5 py-2.5 rounded-[10px] font-medium text-[12px] md:text-[13px] text-white bg-[#468FAF] cursor-pointer'
              >
                MoFit 시작하기
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}

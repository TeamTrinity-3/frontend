import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useAnalyzeResult } from '@/hooks/dashboard/useAnalyzeResult'
import { useUserProfile } from '@/hooks/user/useUserProfile'

export default function FitnessBoard() {
  const isMobile = useBreakpoint('(max-width: 768px)')

  const { data: analyze } = useAnalyzeResult() // 대시보드 분석 결과
  const { data: user } = useUserProfile() // 이름, 프로필 조회
  const userName = user?.name

  const {
    personaResponse,
    llmReport,
    perCore,
    perStrength,
    perAgility,
    perCardio,
    perFlexibility,
    perBodyComposition,
  } = analyze ?? {}

  // 차트 데이터
  const chartData = useMemo(
    () => [
      { label: '코어', v: perCore ?? 0 },
      { label: '근력', v: perStrength ?? 0 },
      { label: '민첩성', v: perAgility ?? 0 },
      { label: '심폐지구력', v: perCardio ?? 0 },
      { label: '유연성', v: perFlexibility ?? 0 },
      { label: '체성분', v: perBodyComposition ?? 0 },
    ],
    [perCore, perStrength, perAgility, perCardio, perFlexibility, perBodyComposition],
  )

  // LLM 리포트 문단 나누기
  const reportParagraphs = useMemo(
    () => (llmReport ? llmReport.split('\n').filter((p) => p.trim().length > 0) : []),
    [llmReport],
  )

  return (
    <section className='mt-4 px-4 py-5 rounded-[10px] bg-[#F5F5F7] max-[840px]:bg-[#FFFFFF] max-[768px]:py-4'>
      {/* 내용(2컬럼) */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:gap-8 items-start [@media(min-width:840px)_and_(max-width:1200px)]:grid-cols-1'>
        {/* 분석 차트 */}
        <div
          className='md:pt-12 xl:pt-2 max-[1400px]:pt-0 max-[1201px]:-mt-15 max-[1201px]:-mb-10
                     max-[840px]:-mt-6 max-[768px]:mt-0 max-[768px]:-mb-3 max-[640px]:mb-3'
        >
          <div className='h-[260px] md:h-[380px] xl:h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart
                data={chartData}
                cx='50%'
                cy={isMobile ? '54%' : '50%'}
                outerRadius={isMobile ? '80%' : '75%'}
              >
                <PolarGrid gridType='polygon' />
                <PolarAngleAxis
                  dataKey='label'
                  tick={{ fontSize: 12, fill: '#000', fontWeight: 500 }}
                />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name='score' dataKey='v' stroke='#468FAF' fill='#28B5E1' fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 분석 내용 */}
        <article
          className='mt-3 -ml-5 mr-3 p-2 sm:p-6 max-[1400px]:mt-1 
                     max-[1201px]:mt-0 max-[1201px]:ml-0 max-[1201px]:mr-0'
        >
          <h4 className='text-[14px] font-semibold mb-6'>
            {userName} 님은 {personaResponse?.name} {personaResponse?.emoji}
          </h4>

          <div className='space-y-3 text-[12px] leading-5 lg:space-y-5'>
            {/* 페르소나 설명 */}
            <p className='font-medium'>{personaResponse?.description}</p>

            {/* LLM 리포트 (문단 별) */}
            {reportParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

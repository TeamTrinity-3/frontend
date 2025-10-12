import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const DATA = [
  { label: '유연성', v: 78 },
  { label: '체력', v: 65 },
  { label: '순발력', v: 55 },
  { label: '심폐지구력', v: 38 },
  { label: '근력', v: 42 },
]

export default function FitnessBoard() {
  const isMobile = useBreakpoint('(max-width: 768px)')

  return (
    <section className='mt-4 px-4 py-5 rounded-[10px] bg-[#F5F5F7] max-[840px]:bg-[#FFFFFF] max-[768px]:py-4'>
      {/* 내용(2컬럼) */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:gap-8 items-start [@media(min-width:840px)_and_(max-width:1200px)]:grid-cols-1'>
        {/* 분석 차트 */}
        <div
          className='md:pt-12 xl:pt-0 max-[1400px]:pt-0 max-[1201px]:-mt-15 max-[1201px]:-mb-10
                     max-[840px]:-mt-6 max-[768px]:mt-0 max-[768px]:-mb-3 max-[640px]:mb-3'
        >
          <div className='h-[260px] md:h-[380px] xl:h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart
                data={DATA}
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
          <h4 className='text-[14px] font-semibold mb-6'>임성은 님은 운동과 썸타는 타입 💙</h4>

          <div className='space-y-3 text-[12px] leading-5 lg:space-y-5'>
            <p className='font-medium'>
              임성은 님은 20대 여성 / 정상 체중 그룹으로 평균보다 상위 30%입니다!
            </p>
            <p>
              현재 지표를 살펴보면 전반적으로 균형은 잘 갖춰 있으나, 근력과 심폐지구력에서 다소
              부족함이 나타납니다. 이는 일상활동에서는 큰 무리가 없지만, 장시간의 운동이나 고강도
              활동에서는 쉽게 피로를 느낄 수 있다는 의미입니다.
            </p>
            <p>
              이를 개선하기 위해서는 저‒중강도 근력·코어 훈련을 주 2‒3회 이상 권장드리며, 가볍게
              시작할 수 있는 루틴(홈트, 자전거, 줄넘기 등)을 추가하면 큰 도움이 됩니다.
            </p>
            <p>
              지금은 체력의 기초를 다져나가는 단계이므로 무리하기보다는 꾸준히 이어가는 것이
              무엇보다 중요합니다. 작은 습관의 변화가 큰 성장을 만들어내는 만큼, 현재의 노력들을
              이어가신다면 한 달 뒤에는 지금보다 더 강하고 건강한 자신을 발견하게 될 것입니다.
              MoFit은 앞으로의 여정을 든든히 함께하며 언제나 응원하겠습니다.🍀
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

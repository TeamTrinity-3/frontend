import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { s } from './EditHealthIssue.styles'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import Checklist from '@/components/common/Checklist'
import step3 from '@/assets/progress/step3.svg'
import { useHealthInfo } from '@/hooks/health/useHealthInfo'
import { useUpdateHealthInfo } from '@/hooks/health/useUpdateHealthInfo'

export default function EditHealthIssue() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [proficiency, setProficiency] = useState('')
  const [place, setPlace] = useState('')
  const [restrictAreas, setRestrictAreas] = useState<string[]>([])

  const { data: healthInfo } = useHealthInfo()
  const { mutate: updateHealthInfo } = useUpdateHealthInfo()

  // 건강 정보 가져오기
  useEffect(() => {
    if (!healthInfo) return

    setProficiency(healthInfo.proficiency ?? '')
    setPlace(healthInfo.place ?? '')
    setRestrictAreas(healthInfo.restrictAreas ?? [])
  }, [healthInfo])

  // 다음 버튼 클릭할 때
  const handleNext = () => {
    if (!proficiency || !place) {
      alert('필수 항목을 모두 선택해주세요.')
      return
    }

    const healthInfo = JSON.parse(localStorage.getItem('healthInfo') || '{}')

    const healthIssue = {
      gender: healthInfo.gender,
      birth: healthInfo.birth,
      height: Number(healthInfo.height),
      weight: Number(healthInfo.weight),
      proficiency,
      place,
      restrictAreas,
    }

    // 건강 정보 입력 api 호출
    updateHealthInfo(healthIssue, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['healthInfo'] })
        localStorage.removeItem('healthInfo')
        navigate('/mypage')
      },
    })
  }

  return (
    <SidebarProvider>
      <div className='min-h-screen'>
        <div className='max-[1290px]:hidden'>
          <AppSidebar logoOnly />
        </div>

        <SidebarInset>
          {/* 오른쪽 여백 */}
          <aside className={s.aside} />

          <div className={s.main}>
            <div className='h-svh overflow-y-auto'>
              <div className={s.grid}>
                <div className='order-2 min-[1100px]:order-1'>
                  <div className='mb-6'>
                    <p className={s.caption}>정보수정</p>
                    <h1 className={s.title}>건강 이슈 체크</h1>
                  </div>

                  <section className={s.section}>
                    <div>
                      <p className={s.label}>1. 본인의 운동 경험 수준을 선택해주세요.</p>
                      <Checklist
                        value={proficiency ? [proficiency] : []}
                        onChange={(values) => setProficiency(values[0] ?? '')}
                        options={[
                          { id: '입문자', label: '입문자 : 운동을 거의 해본 적 없어요' },
                          { id: '초중급자', label: '초중급자 : 기본적인 동작은 알고 있어요' },
                          { id: '숙련자', label: '숙련자 : 꾸준히 운동 중이에요' },
                        ]}
                      />
                    </div>

                    <div>
                      <p className={s.label}>2. 어디에서 주로 운동하실 예정인가요?</p>
                      <Checklist
                        value={place ? [place] : []}
                        onChange={(values) => setPlace(values[0] ?? '')}
                        options={[
                          { id: '집', label: '집' },
                          { id: '헬스장', label: '헬스장' },
                        ]}
                      />
                    </div>
                  </section>

                  <div className={`${s.section} min-[1100px]:hidden`}>
                    <div className='mt-6 mb-10'>
                      <p className={s.label}>
                        3. 운동하기 불편한 부위가 있나요? (없으면 넘어가주세요)
                      </p>
                      <Checklist
                        multiple
                        value={restrictAreas}
                        onChange={(values) => setRestrictAreas(values)}
                        options={[
                          { id: '목', label: '목' },
                          { id: '허리', label: '허리' },
                          { id: '팔꿈치', label: '팔꿈치' },
                          { id: '손목', label: '손목' },
                          { id: '햄스트링', label: '햄스트링' },
                          { id: '무릎', label: '무릎' },
                          { id: '어깨', label: '어깨' },
                          { id: '발목', label: '발목' },
                        ]}
                      />
                    </div>
                  </div>

                  <Button
                    className={`${s.submit} min-[1100px]:hidden mb-8`}
                    type='submit'
                    onClick={handleNext}
                  >
                    완료
                  </Button>
                </div>

                <div className='order-1 min-[1100px]:order-2 flex flex-col justify-between'>
                  <img src={step3} alt='회원가입 3단계' className={s.stepImg} draggable={false} />

                  <div className={`${s.section} hidden min-[1100px]:block`}>
                    <div className='mt-10 mb-10'>
                      <p className={s.label}>
                        3. 운동하기 불편한 부위가 있나요? (없으면 넘어가주세요)
                      </p>
                      <Checklist
                        multiple
                        value={restrictAreas}
                        onChange={(values) => setRestrictAreas(values)}
                        options={[
                          { id: '목', label: '목' },
                          { id: '허리', label: '허리' },
                          { id: '팔꿈치', label: '팔꿈치' },
                          { id: '손목', label: '손목' },
                          { id: '햄스트링', label: '햄스트링' },
                          { id: '무릎', label: '무릎' },
                          { id: '어깨', label: '어깨' },
                          { id: '발목', label: '발목' },
                        ]}
                      />
                    </div>
                  </div>

                  <Button
                    className={`${s.submit} hidden min-[1100px]:block`}
                    type='submit'
                    onClick={handleNext}
                  >
                    완료
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

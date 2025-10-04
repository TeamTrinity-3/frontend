import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './StepHealthInfo.styles'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import step2 from '@/assets/progress/step2.svg'
import running_Fiti from '@/assets/Images/running-Fiti.svg'

export default function StepHealthInfo() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

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
                  <div className='mb-6 min-[1100px]:mb-10'>
                    <p className={s.caption}>회원가입</p>
                    <h1 className={s.title}>건강 정보 입력</h1>
                  </div>

                  <section className={s.section}>
                    <div>
                      <p className={s.label}>성별</p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${gender === '여성' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setGender('여성')
                          }}
                        >
                          여자
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${gender === '남성' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setGender('남성')
                          }}
                        >
                          남자
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={s.label}>키</p>
                      <div className={s.fieldWrap}>
                        <Input
                          className={`${s.input} ${s.fieldInput}`}
                          type='number'
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                        <p className={s.fieldcaption}>cm</p>
                      </div>
                    </div>

                    <div>
                      <p className={s.label}>체중</p>
                      <div className={s.fieldWrap}>
                        <Input
                          className={`${s.input} ${s.fieldInput}`}
                          type='number'
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                        <p className={s.fieldcaption}>kg</p>
                      </div>
                    </div>
                  </section>

                  <Button
                    className={`${s.submit} min-[1100px]:hidden mt-105 mb-8`}
                    type='submit'
                    onClick={() => navigate('/signup/health/issue')}
                  >
                    다음
                  </Button>
                </div>

                <div className='order-1 min-[1100px]:order-2 flex flex-col justify-between'>
                  <img src={step2} alt='회원가입 2단계' className={s.stepImg} draggable={false} />
                  <img
                    src={running_Fiti}
                    alt='running Fiti'
                    className={s.fitiImg}
                    draggable={false}
                  />
                  <Button
                    className={`${s.submit} hidden min-[1100px]:block`}
                    type='submit'
                    onClick={() => navigate('/signup/health/issue')}
                  >
                    다음
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

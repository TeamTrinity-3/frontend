import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './EditHealthInfo.styles'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import step2 from '@/assets/progress/step2.svg'
import running_Fiti from '@/assets/Images/running-Fiti.svg'
import { useHealthInfo } from '@/hooks/health/useHealthInfo'

export default function EditHealthInfo() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('')
  const [birth, setBirth] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const { data: healthInfo } = useHealthInfo()

  // 건강 정보 가져오기
  useEffect(() => {
    if (!healthInfo) return

    setGender(healthInfo.gender ?? '')
    setBirth(healthInfo.birth ?? '')
    setHeight(String(healthInfo.height ?? ''))
    setWeight(String(healthInfo.weight ?? ''))
  }, [healthInfo])

  // 다음 버튼 클릭할 때 > 로컬스토리지에 저장 후 이동
  const handleNext = () => {
    if (!gender || !birth || !height || !weight) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    if (birth.length !== 8) {
      alert('생년월일은 8자리로 입력해주세요.')
      return
    }

    const healthInfo = {
      gender,
      birth,
      height,
      weight,
    }
    localStorage.setItem('healthInfo', JSON.stringify(healthInfo))

    navigate('/edit/health/issue')
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
                  <div className='mb-6 min-[1100px]:mb-10'>
                    <p className={s.caption}>정보수정</p>
                    <h1 className={s.title}>건강 정보 입력</h1>
                  </div>

                  <section className={s.section}>
                    <div>
                      <p className={s.label}>성별</p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${gender === '여자' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setGender('여자')
                          }}
                        >
                          여자
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${gender === '남자' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setGender('남자')
                          }}
                        >
                          남자
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={s.label}>생년월일</p>
                      <Input
                        className={s.input}
                        type='number'
                        value={birth}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 8)
                          setBirth(value)
                        }}
                        placeholder='예) 19990101'
                      />
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
                    className={`${s.submit} min-[1100px]:hidden mt-80 mb-8`}
                    type='submit'
                    onClick={handleNext}
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
                    onClick={handleNext}
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

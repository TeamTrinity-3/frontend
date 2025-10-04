import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './StepProfile.styles'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import TermsAgreement from '@/components/layout/TermsAgreement'
import step1 from '@/assets/progress/step1.svg'

export default function StepProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

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
                    <h1 className={s.title}>회원 정보 입력</h1>
                  </div>

                  <section className={s.section}>
                    <div>
                      <p className={s.label}>이름</p>
                      <Input
                        className={s.input}
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='예) 홍길동'
                      />
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
                      <p className={s.label}>이메일</p>
                      <Input
                        className={s.input}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='예) mofitrinity@gmail.com'
                      />
                      <Button className={s.btn} type='button'>
                        인증하기
                      </Button>
                    </div>

                    <div>
                      <p className={s.label}>인증번호</p>
                      <Input
                        className={s.input}
                        type='text'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder='예) 19990101'
                      />
                    </div>
                  </section>

                  <div className='py-5 min-[1100px]:hidden'>
                    <TermsAgreement />
                  </div>
                  <Button
                    className={`${s.submit} min-[1100px]:hidden mb-8`}
                    type='submit'
                    onClick={() => navigate('/signup/health/info')}
                  >
                    다음
                  </Button>
                </div>

                <div className='order-1 min-[1100px]:order-2 flex flex-col justify-between'>
                  <img src={step1} alt='회원가입 1단계' className={s.stepImg} draggable={false} />
                  <div className='py-19 hidden min-[1100px]:block'>
                    <TermsAgreement />
                  </div>
                  <Button
                    className={`${s.submit} hidden min-[1100px]:block`}
                    type='submit'
                    onClick={() => navigate('/signup/health/info')}
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

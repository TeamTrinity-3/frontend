import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './StepProfile.styles'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import TermsAgreement from '@/components/layout/TermsAgreement'
import step1 from '@/assets/progress/step1.svg'
import { useRequestEmailAuth } from '@/hooks/auth/useRequestEmailAuth'
import { useSignupUser } from '@/hooks/auth/useSignupUser'
import { useLoginUser } from '@/hooks/auth/useLoginUser'

export default function StepProfile() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('') // 사용자가 입력한 인증코드
  const [sentCode, setSentCode] = useState<string | null>(null) // 발송된 인증코드
  const [agreeAll, setAgreeAll] = useState(false) // 약관 전체 동의 여부

  const { mutate: requestAuthCode, isPending } = useRequestEmailAuth()
  const { mutate: signupUser } = useSignupUser()
  const { mutate: login } = useLoginUser()

  // 모두 입력했는지 확인
  const isValid = name.trim() !== '' && email.trim() !== '' && code.trim() !== '' && agreeAll

  // 이메일 인증 요청 함수
  const handleEmailVerification = () => {
    const storedEmail = localStorage.getItem('loginId')

    // 입력된 이메일과 저장된 이메일이 일치하는지 확인
    if (storedEmail !== email.trim()) {
      alert('가입하지 않은 이메일입니다.')
      return
    }

    requestAuthCode(email, {
      onSuccess: (authCode: string) => {
        setSentCode(authCode)
        alert('인증코드가 발송되었습니다.')
      },
      onError: () => {
        alert('인증코드 발송에 실패했습니다. 잠시 후 다시 시도해주세요.')
      },
    })
  }

  // 인증 코드 확인 함수
  const handleCodeVerification = () => {
    if (sentCode !== code.trim()) {
      alert('인증번호가 일치하지 않습니다.')
      return false
    }
    return true
  }

  // 다음 버튼 클릭할 때
  const handleNext = () => {
    // 1. 모두 입력 & 약관 동의 확인
    if (!isValid) {
      alert('모든 정보를 입력하고 약관에 모두 동의해주셔야 가입이 가능합니다.')
      return
    }

    // 2. 인증코드 확인
    if (!handleCodeVerification()) return

    const storedPassword = localStorage.getItem('password')

    // 3. 회원가입 후 자동 로그인
    signupUser(
      {
        email: email.trim(),
        password: storedPassword as string,
        name: name.trim(),
      },
      {
        onSuccess: () => {
          login(
            { email: email.trim(), password: storedPassword as string },
            {
              onSuccess: () => {
                localStorage.removeItem('loginId')
                localStorage.removeItem('password')
                navigate('/signup/health/info')
              },
            },
          )
        },
      },
    )
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
                      <p className={s.label}>이메일</p>
                      <Input
                        className={s.input}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='예) mofitrinity@gmail.com'
                      />
                      <Button
                        className={s.btn}
                        type='button'
                        onClick={handleEmailVerification}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <span className='flex items-center gap-2'>
                            <Loader2 className='animate-spin size-4' />
                            전송중...
                          </span>
                        ) : (
                          '인증하기'
                        )}
                      </Button>
                    </div>

                    <div>
                      <p className={s.label}>인증번호</p>
                      <Input
                        className={s.input}
                        type='text'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder='예) XXXXXX'
                      />
                    </div>
                  </section>

                  <div className='py-7 min-[1100px]:hidden'>
                    <TermsAgreement onChangeAllAgree={setAgreeAll} />
                  </div>
                  <Button
                    className={`${s.submit} min-[1100px]:hidden mb-8`}
                    type='submit'
                    onClick={handleNext}
                  >
                    다음
                  </Button>
                </div>

                <div className='order-1 min-[1100px]:order-2 flex flex-col justify-between'>
                  <img src={step1} alt='회원가입 1단계' className={s.stepImg} draggable={false} />
                  <div className='py-14 hidden min-[1100px]:block'>
                    <TermsAgreement onChangeAllAgree={setAgreeAll} />
                  </div>
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

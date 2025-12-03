import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './ResetPasswordRequest.styles'
import { Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import landingBg from '@/assets/Images/landing-bg.svg'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'
import { useGetEmailProvider } from '@/hooks/auth/useGetEmailProvider'
import { useRequestEmailAuth } from '@/hooks/auth/useRequestEmailAuth'

export default function ResetPasswordRequest() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sentCode, setSentCode] = useState<string | null>(null) // 발송된 인증코드

  const { mutate: getProvider } = useGetEmailProvider() // 로컬 회원가입인지 확인
  const { mutate: requestAuthCode, isPending } = useRequestEmailAuth() // 인증코드 발송

  // 이메일 인증 요청 함수
  const handleCheckEmail = () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.')
      return
    }

    getProvider(email.trim(), {
      onSuccess: (provider: any) => {
        if (provider === 'local') {
          // 로컬 회원가입이면 인증코드 발송
          requestAuthCode(email.trim(), {
            onSuccess: (authCode: string) => {
              setSentCode(authCode)
              alert('인증코드가 발송되었습니다.')
            },
            onError: () => {
              alert('인증코드 발송에 실패했습니다. 잠시 후 다시 시도해주세요.')
            },
          })
        } else if (provider === 'SNS') {
          alert('SNS로 가입된 계정은 비밀번호를 변경할 수 없습니다.')
        } else {
          alert('가입되지 않은 이메일입니다.')
        }
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

  // 다음 버튼 클릭할 때 인증 코드 확인
  const handleNext = () => {
    if (!handleCodeVerification()) return

    localStorage.setItem('loginId', email.trim())
    navigate('/resetPW/confirm')
  }

  return (
    <main className={s.root}>
      <img src={landingBg} alt='landing background' className={s.bgImage} />
      <div className={s.overlay} />
      <img
        src={moFitLogo}
        alt='MoFit'
        className='absolute top-6 left-4 h-9 w-auto md:top-15 md:left-25 md:h-12 cursor-pointer'
        onClick={() => navigate('/')}
      />

      <Card className={s.card}>
        <CardHeader>
          <CardTitle className={s.title}>비밀번호 재설정</CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <p className={s.label}>가입한 이메일을 입력해주세요</p>
            <Input
              className={s.input}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <Button className={s.btn} type='button' onClick={handleCheckEmail} disabled={isPending}>
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
              placeholder='Code'
            />
          </div>

          <Button className={s.submit} type='submit' onClick={handleNext}>
            다음
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

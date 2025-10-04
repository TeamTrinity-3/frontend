import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './ResetPasswordRequest.styles'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import landingBg from '@/assets/Images/landing-bg.svg'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'

export default function ResetPasswordRequest() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  //   const [emailErr, setEmailErr] = useState<string | null>(null);
  //   const [codeErr, setCodeErr] = useState<string | null>(null);

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
              placeholder='Code'
            />
            <Button className={s.btn} type='button'>
              확인
            </Button>
          </div>

          <Button className={s.submit} type='submit' onClick={() => navigate('/resetPW/confirm')}>
            다음
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

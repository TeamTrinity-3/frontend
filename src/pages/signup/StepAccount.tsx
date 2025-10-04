import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './StepAccount.styles'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleCheck, Eye, EyeOff } from 'lucide-react'
import landingBg from '@/assets/Images/landing-bg.svg'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'

export default function StepAccount() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [confirmPW, setConfirmPW] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPW, setShowConfirmPW] = useState(false)

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
          <CardTitle className={s.title}>회원가입</CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <p className={s.label}>이메일을 입력해주세요</p>
            <div className={s.fieldWrap}>
              <Input
                className={`${s.input} ${s.fieldInput}`}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <button className={s.checkBtn} type='button'>
                <CircleCheck size={18} />
              </button>
            </div>
            {/* <Button className={s.btn} type='button'>
              중복확인
            </Button> */}
          </div>

          <div className='mt-5'>
            <p className={s.label}>비밀번호</p>
            <div className={s.fieldWrap}>
              <Input
                className={`${s.input} ${s.fieldInput}`}
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder='Password'
              />
              <button className={s.eyeBtn} type='button' onClick={() => setShowPw((v) => !v)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className='mt-2'>
            <div className={s.fieldWrap}>
              <Input
                className={`${s.input} ${s.fieldInput}`}
                type={showConfirmPW ? 'text' : 'password'}
                value={confirmPW}
                onChange={(e) => setConfirmPW(e.target.value)}
                placeholder='Confirm Password'
              />
              <button
                className={s.eyeBtn}
                type='button'
                onClick={() => setShowConfirmPW((v) => !v)}
              >
                {showConfirmPW ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button className={s.submit} type='submit' onClick={() => navigate('/signup/profile')}>
            다음
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './ResetPasswordConfirm.styles'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import landingBg from '@/assets/Images/landing-bg.svg'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'

export default function ResetPasswordConfirm() {
  const navigate = useNavigate()
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
          <CardTitle className={s.title}>비밀번호 재설정</CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <p className={s.label}>새로운 비밀번호를 입력해주세요</p>
            <div className={s.pwWrap}>
              <Input
                className={`${s.input} ${s.pwInput}`}
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

          <div className='mt-5'>
            <p className={s.label}>비밀번호 확인</p>
            <div className={s.pwWrap}>
              <Input
                className={`${s.input} ${s.pwInput}`}
                type={showConfirmPW ? 'text' : 'password'}
                value={confirmPW}
                onChange={(e) => setConfirmPW(e.target.value)}
                placeholder='Password'
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

          <Button className={s.submit} type='submit' onClick={() => navigate('/')}>
            비밀번호 변경
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

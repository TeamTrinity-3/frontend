import { useState } from 'react'
import { s } from './Login.styles'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import landingBg from '@/assets/Images/landing-bg.svg'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'
import googleLogo from '@/assets/logo/google.svg'
import kakaoLogo from '@/assets/logo/kakao.svg'
import naverLogo from '@/assets/logo/naver.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [showPw, setShowPw] = useState(false)

  return (
    <main className={s.root}>
      <img src={landingBg} alt='landing background' className={s.bgImage} />
      <div className={s.overlay} />
      <img
        src={moFitLogo}
        alt='MoFit'
        className='absolute top-6 left-4 h-9 w-auto md:top-15 md:left-25 md:h-12'
      />

      <Card className={s.card}>
        <CardHeader>
          <CardTitle className={s.title}>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            className={s.form}
            onSubmit={(e) => {
              e.preventDefault()
              // TODO: submit 로직
            }}
          >
            <div>
              <Input
                className={s.input}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </div>

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

            <a href='/resetPW/request' className={s.forgot}>
              비밀번호를 잊어버리셨나요?
            </a>

            <Button className={s.submit} type='submit'>
              Login
            </Button>

            <hr className='mt-3 mb-6 border-t-[1.5px] border-[#ECECEC]' />

            <div>
              <p className={s.altTitle}>다른 방식으로 로그인</p>
              <div className={s.altGrid}>
                {/* Google */}
                <button className={s.altBtn} type='button'>
                  <img src={googleLogo} alt='Google' className='h-7 w-7' />
                  <span className='text-sm'>Google</span>
                </button>

                {/* Kakao */}
                <button className={s.altBtn} type='button'>
                  <img src={kakaoLogo} alt='Kakao' className='h-7 w-7' />
                  <span className='text-sm'>Kakao</span>
                </button>

                {/* Naver */}
                <button className={s.altBtn} type='button'>
                  <img src={naverLogo} alt='Naver' className='h-7 w-7' />
                  <span className='text-sm'>Naver</span>
                </button>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className='flex justify-center'>
          <p className={s.helper}>
            계정이 없으신가요?{' '}
            <a href='/signup/account' className='text-[#468FAF]'>
              회원가입
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}

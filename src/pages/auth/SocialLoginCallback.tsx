import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@/hooks/auth/useGoogleLogin'

export default function SocialLoginCallback() {
  const location = useLocation()
  const navigate = useNavigate()
  const socialLogin = useGoogleLogin()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tempCode = params.get('code')
    const error = params.get('error')

    // 에러 처리
    if (error) {
      if (error.includes('Account exists with a different login method')) {
        alert('다른 방식으로 가입된 계정입니다. 기존 로그인 방식을 사용해주세요.')
      } else {
        alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
      navigate('/', { replace: true })
      return
    }

    // tempCode가 없을 경우
    if (!tempCode) {
      alert('잘못된 접근입니다.')
      navigate('/', { replace: true })
      return
    }

    // tempCode로 token 발급 요청
    socialLogin.mutate(tempCode, {
      onSuccess: (token) => {
        localStorage.setItem('token', token)
        navigate('/home', { replace: true })
      },
      onError: () => {
        alert('로그인 중 오류가 발생했습니다.')
        navigate('/', { replace: true })
      },
    })
  }, [location.search, navigate, socialLogin])

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <p className='text-sm text-gray-500'>로그인 중입니다...</p>
    </main>
  )
}

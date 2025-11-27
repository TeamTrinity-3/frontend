import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@/hooks/auth/useGoogleLogin'

export default function SocialLoginCallback() {
  const location = useLocation()
  const navigate = useNavigate()
  const { mutate } = useGoogleLogin()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tempCode = params.get('code')

    // tempCode가 없을 경우
    if (!tempCode) {
      alert('잘못된 접근입니다.')
      navigate('/', { replace: true })
      return
    }

    // tempCode로 token 발급 요청
    mutate(tempCode, {
      onSuccess: (token) => {
        const pureToken = token.replace(/^Bearer\s+/i, '')
        localStorage.setItem('token', pureToken)
        navigate('/home', { replace: true })
      },
      onError: () => {
        alert('로그인 중 오류가 발생했습니다.')
        navigate('/', { replace: true })
      },
    })
  }, [location.search, navigate, mutate])

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <p className='text-sm text-gray-500'>로그인 중입니다...</p>
    </main>
  )
}

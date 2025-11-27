import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SocialLoginFailure() {
  const location = useLocation()
  const navigate = useNavigate()
  const calledRef = useRef(false)

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    const params = new URLSearchParams(location.search)
    const error = params.get('error') ?? ''

    if (error.includes('Account exists with a different login method')) {
      alert('다른 방식으로 가입된 계정입니다.\n기존 로그인 방식을 사용해주세요.')
    } else {
      alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }

    navigate('/', { replace: true })
  }, [location.search, navigate])

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <p className='text-sm text-gray-500'>로그인 실패 처리 중입니다...</p>
    </main>
  )
}

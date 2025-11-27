import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import runningFiti from '@/assets/Images/running-Fiti.svg'
import type { StaminaPayload } from '@/api/stamina'
import { useHealthInfo } from '@/hooks/health/useHealthInfo'
import { usePostDashboard } from '@/hooks/dashboard/usePostDashboard'
import { buildDashboardUser } from '@/utils/dashboardUser'

export default function FitnessTestLoading() {
  const navigate = useNavigate()
  const { data: healthInfo, isLoading } = useHealthInfo()
  const { mutate: postDashboard } = usePostDashboard()

  useEffect(() => {
    if (isLoading) return

    const timeout = setTimeout(() => {
      // age, bmi, gender 생성
      const dashboardUser = buildDashboardUser(healthInfo ?? null)
      if (!dashboardUser) {
        alert('건강 정보가 없어 체력 진단을 진행할 수 없습니다.')
        navigate('/edit/health/info')
        return
      }

      // stamina 내용 꺼내오기
      const raw = localStorage.getItem('stamina')
      if (!raw) {
        alert('체력 측정 결과가 없습니다. 다시 측정해주세요.')
        navigate('/fitness/test')
        return
      }
      const stamina = JSON.parse(raw) as StaminaPayload

      // payload 생성
      const payload = {
        age: dashboardUser.age,
        bmi: dashboardUser.bmi,
        gender: dashboardUser.gender,
        stamina: {
          balance: stamina.balance,
          chairSquat: stamina.chairSquat,
          forwardFold: stamina.forwardFold,
          plank: stamina.plank,
          pushUp: stamina.pushUp,
          stepTest: stamina.stepTest,
        },
      }

      // 대시보드 결과 출력 api 호출
      postDashboard(payload, {
        onSuccess: (data) => {
          localStorage.removeItem('stamina')
          navigate('/fitness/test/result', { state: data })
        },
      })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [healthInfo, isLoading, navigate, postDashboard])

  return (
    <main className='min-h-svh flex flex-col items-center justify-center text-center -translate-y-8'>
      {/* Loading */}
      <p
        className='mb-6 font-semibold text-[22px] animate-pulse max-[430px]:text-[20px]'
        aria-live='polite'
      >
        Loading...
      </p>

      {/* 이미지 */}
      <img src={runningFiti} className='w-60 h-auto mb-6 max-[430px]:w-50' draggable={false} />

      {/* 안내 */}
      <div className='leading-relaxed font-semibold text-[20px] max-[430px]:text-[18px]'>
        <p>회원님의 체력을 진단 중입니다😊</p>
        <p>잠시만 기다려주세요!</p>
      </div>
    </main>
  )
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextAlignJustify } from 'lucide-react'
import { s } from './Home.styles'
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import WeekRoutines from '@/components/common/WeekRoutines'
import TodayRoutine from '@/components/common/TodayRoutine'
import SearchBar from '@/components/common/SearchBar'
import SearchCategory from '@/components/common/SearchCategory'
import Recommend from '@/components/common/Recommend'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useHealthInfo } from '@/hooks/health/useHealthInfo'
import { useUserProfile } from '@/hooks/user/useUserProfile'
import defaultProfile from '@/assets/Images/profile.svg'

function HomeContent() {
  const navigate = useNavigate()

  const [sideOpen, setSideOpen] = useState(false)
  const { setOpenMobile } = useSidebar()

  const isLt768 = useBreakpoint('(max-width: 767px)')
  const isLt1400 = useBreakpoint('(max-width: 1400px)')

  const { data: healthInfo, isLoading, isFetching } = useHealthInfo() // 건강 정보 조회
  const { data: user } = useUserProfile() // 이름, 프로필 조회

  // 구글 로그인 후 건강 정보가 없으면 입력 페이지로 이동
  useEffect(() => {
    if (isLoading || isFetching) return

    if (healthInfo === null) {
      alert('진단을 위해 먼저 건강 정보를 입력해주세요.')
      navigate('/signup/health/info', { replace: true })
    }
  }, [healthInfo, isLoading, isFetching, navigate])

  const userName = user?.name
  const profileSrc = user?.picture ?? defaultProfile // 프로필 없으면 기본 이미지

  const openSidebar = () => {
    if (isLt768) {
      setOpenMobile?.(true)
    } else if (isLt1400) {
      setSideOpen(true)
      setOpenMobile?.(false)
    }
  }
  const closeSidebar = () => {
    if (isLt768) setOpenMobile?.(false)
    setSideOpen(false)
  }

  return (
    <SidebarInset>
      {/* 상단바 메뉴 관련 레이아웃 */}
      <div>
        {/* 상단바 */}
        <div className={s.top_bar}>
          <button type='button' onClick={openSidebar} className='text-[#7B7B7B] cursor-pointer'>
            <TextAlignJustify className='size-4.5' />
          </button>
        </div>

        {/* 상단바 오버레이 */}
        <button
          onClick={closeSidebar}
          className={`${s.overlay} ${sideOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />

        {/* 상단바에서 쓰는 사이드바 */}
        {sideOpen && (
          <div className={s.mobile_Sidebar}>
            <AppSidebar className='z-[80]' />
          </div>
        )}
      </div>

      <div className={s.layout}>
        {/* 가짜 사이드바 (공간 채우기용) */}
        <div className={s.fakeSidebar} />

        {/* 메인 */}
        <main className={s.main}>
          {/* 헤더 */}
          <div className={s.header}>
            <div>
              <h1 className={s.title}>안녕하세요, {userName}님👋</h1>
              <p className={s.subtext}>오늘도 Fiti와 운동을 시작해볼까요?</p>
            </div>
            <img src={profileSrc} alt='프로필' className='mb-4 h-11 w-11 rounded-full' />
          </div>

          {/* 배너 */}
          <div>
            <div className={s.banner}>
              <picture>
                {/* 모바일 배너 */}
                <source
                  media='(max-width: 1020px)'
                  srcSet='/src/assets/Images/MoFit-bn-mobile.jpg'
                />
                {/* 웹 배너 */}
                <img
                  src='/src/assets/Images/MoFit-bn.jpg'
                  alt='배너'
                  loading='lazy'
                  className={s.web_banner}
                />
              </picture>
            </div>
          </div>

          {/* 검색 */}
          <div className='max-[840px]:hidden'>
            <SearchBar />
            <SearchCategory />
            <Recommend />
          </div>
        </main>

        {/* 오른쪽 400px 패널 */}
        <aside className={s.aside}>
          <WeekRoutines />
          <TodayRoutine />

          <div className='hidden max-[840px]:block mt-8 max-[490px]:mt-5'>
            <SearchBar />
            <SearchCategory />
            <Recommend />
          </div>
        </aside>
      </div>
    </SidebarInset>
  )
}

export default function Home() {
  return (
    <SidebarProvider>
      <div className='max-[1400px]:hidden'>
        <AppSidebar />
      </div>
      <HomeContent />
    </SidebarProvider>
  )
}

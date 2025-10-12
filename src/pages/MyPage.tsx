import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextAlignJustify, Pencil } from 'lucide-react'
import { s } from './MyPage.styles'
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import WeekRoutines from '@/components/common/WeekRoutines'
import TodayRoutine from '@/components/common/TodayRoutine'
import FitnessBoard from '@/components/common/FitnessBoard'
import { useBreakpoint } from '@/hooks/useBreakpoint'

function MyPageContent() {
  const navigate = useNavigate()

  const [sideOpen, setSideOpen] = useState(false)
  const { setOpenMobile } = useSidebar()

  const isLt768 = useBreakpoint('(max-width: 767px)')
  const isLt1400 = useBreakpoint('(max-width: 1400px)')

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

          <div className='ml-auto hidden max-[840px]:flex items-center gap-4'>
            <button
              type='button'
              onClick={() => navigate('/signup/health/info')}
              className='text-[#7B7B7B] cursor-pointer'
            >
              <Pencil className='size-4.5' />
            </button>
            <img
              src='/src/assets/Images/profile.svg'
              alt='프로필'
              className='h-9 w-9 rounded-full'
            />
          </div>
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
              <h1 className={s.title}>Mypage</h1>
            </div>

            <div className='flex items-center gap-5 max-[840px]:hidden'>
              <button
                type='button'
                onClick={() => navigate('/signup/health/info')}
                className='text-[#7B7B7B] cursor-pointer'
              >
                <Pencil className='size-4.5' />
              </button>
              <img
                src='/src/assets/Images/profile.svg'
                alt='프로필'
                className='h-11 w-11 rounded-full'
              />
            </div>
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

          {/* 체력 진단 보드 */}
          <div>
            <h3 className={s.sub_title}>임성은 님의 체력 진단 보드</h3>
            <FitnessBoard />
            <div className='mt-4 flex justify-end'>
              <button type='button' onClick={() => navigate('/fitness/test')} className={s.btn}>
                체력 재측정
              </button>
            </div>
          </div>
        </main>

        {/* 오른쪽 400px 패널 */}
        <aside className={s.aside}>
          <div className='max-[840px]:hidden'>
            <WeekRoutines />
            <TodayRoutine />
          </div>
        </aside>
      </div>
    </SidebarInset>
  )
}

export default function MyPage() {
  return (
    <SidebarProvider>
      <div className='max-[1400px]:hidden'>
        <AppSidebar />
      </div>
      <MyPageContent />
    </SidebarProvider>
  )
}

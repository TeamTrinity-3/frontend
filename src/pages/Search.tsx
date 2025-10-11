import { useState } from 'react'
import { TextAlignJustify } from 'lucide-react'
import { s } from './Search.styles'
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import WeekRoutines from '@/components/common/WeekRoutines'
import TodayRoutine from '@/components/common/TodayRoutine'
import SearchBar from '@/components/common/SearchBar'
import SearchCategory from '@/components/common/SearchCategory'
import SearchResult from '@/components/common/SearchResult'
import { useBreakpoint } from '@/hooks/useBreakpoint'

function SearchContent() {
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

          <img
            src='/src/assets/Images/profile.svg'
            alt='프로필'
            className='ml-auto h-9 w-9 rounded-full hidden max-[840px]:block'
          />
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
              <h1 className={s.title}>Search Training</h1>
            </div>
            <img
              src='/src/assets/Images/profile.svg'
              alt='프로필'
              className='h-11 w-11 rounded-full max-[840px]:hidden'
            />
          </div>

          {/* 검색 */}
          <div className='max-[840px]:hidden'>
            <SearchBar />
            <SearchCategory />
            <SearchResult />
          </div>
        </main>

        {/* 오른쪽 400px 패널 */}
        <aside className={s.aside}>
          <div className='max-[840px]:hidden'>
            <WeekRoutines />
            <TodayRoutine />
          </div>

          <div className='hidden max-[840px]:block max-[490px]:-mt-2'>
            <SearchBar />
            <SearchResult />
            <div>
              <h3
                className='hidden max-[840px]:block -mt-2 -mb-4 text-[15px] font-semibold 
                               max-[490px]:mt-7 max-[490px]:mb-1 max-[490px]:text-sm'
              >
                Category
              </h3>
              <SearchCategory />
            </div>
          </div>
        </aside>
      </div>
    </SidebarInset>
  )
}

export default function Search() {
  return (
    <SidebarProvider>
      <div className='max-[1400px]:hidden'>
        <AppSidebar />
      </div>
      <SearchContent />
    </SidebarProvider>
  )
}

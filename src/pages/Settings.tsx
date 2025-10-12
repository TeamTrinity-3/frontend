import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextAlignJustify, ChevronRight } from 'lucide-react'
import { s } from './Settings.styles'
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import { useBreakpoint } from '@/hooks/useBreakpoint'

function SettingsContent() {
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
            <h1 className={s.title}>Settings</h1>
          </div>

          {/* 본문 */}
          <div
            style={{ ['--gb' as any]: '35px', ['--tb' as any]: '135px' }}
            className='pb-[max(env(safe-area-inset-bottom),var(--gb))] md:[--tb:56px]'
          >
            <section className={s.setting}>
              {/* 개인정보처리방침 */}
              <button type='button' onClick={() => navigate('/policy/privacy')} className={s.btn}>
                <span>개인정보처리방침</span>
                <ChevronRight className='size-4 text-[#7B7B7B]' />
              </button>

              <div className='h-px bg-[#EFEFEF]' />

              {/* 비밀번호 재설정 */}
              <button type='button' onClick={() => navigate('/resetPW/request')} className={s.btn}>
                <span>비밀번호 재설정</span>
                <ChevronRight className='size-4 text-[#7B7B7B]' />
              </button>

              {/* 회원탈퇴, 로그아웃 */}
              <div className='mt-auto flex items-center justify-center gap-7 px-5 py-10 text-[12px] font-medium'>
                <button
                  type='button'
                  onClick={() => {
                    if (
                      window.confirm(
                        '정말로 회원 탈퇴하시겠습니까?\n탈퇴 시 모든 정보가 삭제됩니다.',
                      )
                    ) {
                      navigate('/')
                    }
                  }}
                  className='cursor-pointer'
                >
                  회원탈퇴
                </button>
                <span className='w-px h-4 bg-black/10' />
                <button type='button' onClick={() => navigate('/')} className='cursor-pointer'>
                  로그아웃
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarInset>
  )
}

export default function Settings() {
  return (
    <SidebarProvider>
      <div className='max-[1400px]:hidden'>
        <AppSidebar />
      </div>
      <SettingsContent />
    </SidebarProvider>
  )
}

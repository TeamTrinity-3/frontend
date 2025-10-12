export const s = {
  // 상단바
  top_bar:
    'fixed inset-x-0 top-0 z-[50] hidden h-12 items-center ' +
    'border-b bg-white px-4 max-[1400px]:flex max-[1400px]:h-15',

  // 상단바 오버레이
  overlay: 'fixed inset-0 z-[60] bg-black/50 hidden max-[1400px]:block',

  // 모바일 사이드바
  mobile_Sidebar: 'z-[70] hidden max-[1400px]:block',

  // 전체 페이지 레이아웃
  layout:
    'fixed inset-x-0 top-0 bottom-0 overflow-y-auto ' +
    'grid grid-cols-[14.5rem_1fr_400px] ' +
    'max-[1400px]:grid-cols-[1fr_400px] max-[1400px]:top-15 ' +
    'max-[840px]:grid-cols-1 max-[840px]:overflow-y-auto',

  // 가짜 사이드바 (공간 채우기용)
  fakeSidebar: 'h-full bg-white max-[1400px]:hidden',

  // 메인
  main:
    'w-full h-full px-10 pt-8 pb-8 ' +
    'max-[840px]:h-auto max-[840px]:overflow-visible max-[840px]:pb-0 max-[840px]:bg-[#F5F5F7] ' +
    'max-[490px]:px-5 max-[490px]:pt-6',

  // 제목
  title: 'text-lg font-semibold max-[490px]:text-base',

  // 헤더
  header: 'mb-6 flex items-center justify-between',

  // 설정 본문
  setting:
    'w-[min(450px,100%)] rounded-[10px] bg-white shadow-sm border border-black/5 ' +
    'flex flex-col overflow-hidden min-h-[360px] max-h-[820px] ' +
    'h-[calc(100dvh-var(--tb)-max(env(safe-area-inset-bottom),var(--gb)))]',
  btn: 'flex w-full items-center justify-between px-6 h-15 text-[13px] font-medium hover:bg-black/[0.03] transition-colors cursor-pointer',
}

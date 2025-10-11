export const s = {
  // 상단바
  top_bar:
    'fixed inset-x-0 top-0 z-[50] hidden h-12 items-center ' +
    'border-b bg-white px-4 max-[1400px]:flex',

  // 상단바 오버레이
  overlay: 'fixed inset-0 z-[60] bg-black/50 hidden max-[1400px]:block',

  mobile_Sidebar: 'z-[70] hidden max-[1400px]:block',

  // 전체 페이지 레이아웃
  layout:
    'fixed inset-x-0 top-0 bottom-0 overflow-y-auto ' +
    'grid grid-cols-[14.5rem_1fr_400px] ' +
    'max-[1400px]:grid-cols-[1fr_400px] max-[1400px]:top-11 ' +
    'max-[840px]:grid-cols-1 max-[840px]:overflow-y-auto',

  // 가짜 사이드바 (공간 채우기용)
  fakeSidebar: 'h-full bg-white max-[1400px]:hidden',

  // 메인
  main:
    'w-full h-full px-10 pt-8 ' +
    'max-[840px]:h-auto max-[840px]:overflow-visible max-[840px]:bg-[#F5F5F7] ' +
    'max-[490px]:px-5 max-[490px]:pt-6',

  // 메인 제목
  title: 'text-lg font-semibold mb-1 max-[490px]:text-base',
  subtext: 'text-[13px] text-[#7B7B7B] font-medium mb-4 max-[490px]:text-[12px] max-[490px]:mb-3',

  // 헤더
  header: 'mb-2 flex items-center justify-between',

  // 배너
  banner: 'relative w-full overflow-hidden rounded-[10px]',
  web_banner:
    'w-full h-[170px] max-[1120px]:h-[145px] max-[1020px]:h-[140px] ' +
    'max-[840px]:h-[150px] max-[600px]:h-[140px] max-[490px]:h-[100px] object-cover',

  // 오른쪽 패널
  aside:
    'h-full bg-[#F5F5F7] px-8 pt-8 sticky top-0 ' +
    'max-[840px]:h-auto max-[840px]:px-10 max-[840px]:pb-8 ' +
    'max-[840px]:overflow-visible max-[840px]:static ' +
    'max-[490px]:px-5 max-[490px]:pt-5 max-[490px]:pb-6',
}

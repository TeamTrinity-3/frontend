export const s = {
  // 전체 페이지 레이아웃
  layout:
    'fixed top-0 left-0 w-screen h-screen ' +
    'grid grid-cols-[14.5rem_1fr_400px] ' +
    'max-[1400px]:grid-cols-[1fr_400px] ' +
    'max-[840px]:grid-cols-1 max-[840px]:overflow-y-auto',

  // 가짜 사이드바 (공간 채우기용)
  fakeSidebar: 'h-full bg-white max-[1400px]:hidden',

  // 메인
  main:
    'w-full h-full px-10 pt-11 ' +
    'max-[840px]:h-auto max-[840px]:overflow-visible max-[840px]:bg-[#F5F5F7] ' +
    'max-[490px]:px-4 max-[490px]:pt-6',

  // 메인 제목
  title: 'text-xl font-semibold mb-4 max-[490px]:text-lg max-[490px]:mb-3',

  // 타이머 영역
  timerWrap: 'relative w-full mb-8 max-[490px]:mb-4',

  // 오른쪽 패널
  aside:
    'h-full bg-[#F5F5F7] px-8 pt-8 sticky top-0 ' +
    'max-[840px]:h-auto max-[840px]:px-10 max-[840px]:pb-11 ' +
    'max-[840px]:overflow-visible max-[840px]:static ' +
    'max-[490px]:px-4 max-[490px]:pt-4 max-[490px]:pb-6',
}

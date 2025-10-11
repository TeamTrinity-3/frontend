import runningFiti from '@/assets/Images/running-Fiti.svg'

export default function FitnessTestLoading() {
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

import { RefreshCw, Clock } from 'lucide-react'

export default function TodayRoutine() {
  // 더미 데이터
  const steps = [
    { label: '복식호흡', time: '03:00' },
    { label: '스쿼트', time: '08:00' },
    { label: '플랭크', time: '05:00' },
    { label: '팔굽혀펴기', time: '03:50' },
  ]

  // 총 소요 시간 계산
  const totalSec = steps.reduce((sum, s) => {
    const [m, s2] = s.time.split(':').map(Number)
    return sum + m * 60 + s2
  }, 0)
  const totalMin = Math.floor(totalSec / 60)
  const totalRem = totalSec % 60
  const durationText = `${totalMin}m ${totalRem}s`

  return (
    <aside className='rounded-[10px] bg-white p-6 w-full'>
      {/* Today's routines + 새로고침 */}
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-[14px] font-semibold'>Today’s routines</h2>
        <button type='button' aria-label='refresh routines' className='cursor-pointer'>
          <RefreshCw size={16} />
        </button>
      </div>

      {/* 이미지 자리, h는 이미지 비율대로 되도록 수정*/}
      <div className='h-36 max-[840px]:h-80 max-[600px]:h-36 w-full rounded-[10px] bg-[#ECEFF3] mb-4' />

      {/* 텍스트/아이콘 오버레이 */}
      <div className='text-[14px] font-semibold'>코어 강화 운동</div>
      <div className='mt-1 text-[12px] text-[#7B7B7B]'>몸의 중심을 강화할 수 있습니다</div>
      <div className='mt-3 ml-1 flex items-center gap-2 text-[12px] font-semibold'>
        <Clock size={15} />
        <span>{durationText}</span>
      </div>

      <hr className='mt-4 mb-4 border-t-[1.5px] border-[#ECECEC]' />

      {/* 진행 순서 */}
      <h3 className='text-[14px] font-semibold mb-3'>운동 진행 순서</h3>
      <ol className='space-y-2 mb-5'>
        {steps.map((s, i) => (
          <li
            key={`${s.label}-${i}`}
            className='flex items-center justify-between rounded-[10px] px-3 py-2 border bg-white border-[#ECECEC]'
          >
            <div className='flex items-center gap-3 font-medium'>
              <span className='h-7 w-7 rounded-full bg-[#A8D6E5] text-[13px] font-semibold grid place-items-center'>
                {i + 1}
              </span>
              <span className='text-[13px]'>
                {s.label} <span className='text-[#7B7B7B]'>({s.time}) </span>
              </span>
            </div>
          </li>
        ))}
      </ol>

      {/* Start 버튼 */}
      <button
        type='button'
        className='mt-2 mb-1 h-10 w-full px-6 rounded-[10px] text-[13px] text-white bg-[#468FAF] cursor-pointer'
        aria-label='Start'
      >
        Start
      </button>
    </aside>
  )
}

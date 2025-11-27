import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, Clock } from 'lucide-react'
import RoutineGuideModal from '@/components/common/RoutineGuideModal'
import { useWeekPlan } from '@/hooks/user/useWeekPlan'
import { useTodayRoutine } from '@/hooks/user/useTodayRoutine'

// listResponses 타입
type ExerciseItem = {
  exerciseId: number
  sequence: number
  exerciseName: string
  totalSec: number
}

// 초 >> 0m 0s
const formatDuration = (sec: number) => {
  const min = Math.floor(sec / 60)
  const rem = sec % 60
  return `${min}m ${rem}s`
}

// 초 >> mm:ss
const formatTime = (sec: number) => {
  const min = Math.floor(sec / 60)
  const rem = sec % 60
  return `${String(min).padStart(2, '0')}:${String(rem).padStart(2, '0')}`
}

export default function TodayRoutine() {
  const navigate = useNavigate()
  const [openGuide, setOpenGuide] = useState(false)

  // 오늘 planId 가져오기
  const { data: weekPlan } = useWeekPlan()
  const planId = weekPlan?.plans?.[weekPlan.currentDay - 1]?.planId

  // 오늘의 루틴 불러오기
  const { data: todayRoutine } = useTodayRoutine(planId)
  if (!todayRoutine) return null

  const { image, title, description, routineSec, listResponses: rawList } = todayRoutine
  const listResponses = (rawList ?? []) as ExerciseItem[]
  const durationText = formatDuration(routineSec)

  return (
    <>
      <aside className='rounded-[10px] bg-white p-6 w-full'>
        {/* Today's routines + 새로고침 */}
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-[14px] font-semibold'>Today’s routines</h2>
          <button
            type='button'
            aria-label='refresh routines'
            className='cursor-pointer'
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* 이미지 자리, h는 이미지 비율대로 되도록 수정*/}
        <div className='h-36 max-[840px]:h-80 max-[600px]:h-36 w-full rounded-[10px] bg-[#ECEFF3] mb-4 overflow-hidden'>
          {image && <img src={image} alt={title} className='h-full w-full object-cover' />}
        </div>

        {/* 텍스트/아이콘 오버레이 */}
        <div className='text-[14px] font-semibold'>{title}</div>
        <div className='mt-1 text-[12px] text-[#7B7B7B]'>{description}</div>
        <div className='mt-3 ml-1 flex items-center gap-2 text-[12px] font-semibold'>
          <Clock size={15} />
          <span>{durationText}</span>
        </div>

        <hr className='mt-4 mb-4 border-t-[1.5px] border-[#ECECEC]' />

        {/* 진행 순서 */}
        <h3 className='text-[14px] font-semibold mb-3'>운동 진행 순서</h3>
        <ol className='space-y-2 mb-5'>
          {listResponses
            .slice()
            .sort((a, b) => a.sequence - b.sequence)
            .map((item) => (
              <li
                key={item.sequence}
                className='flex items-center justify-between rounded-[10px] px-3 py-2 border bg-white border-[#ECECEC]'
              >
                <div className='flex items-center gap-3 font-medium'>
                  <span className='h-7 w-7 rounded-full bg-[#A8D6E5] text-[13px] font-semibold grid place-items-center'>
                    {item.sequence}
                  </span>
                  <span className='text-[13px]'>
                    {item.exerciseName}{' '}
                    <span className='text-[#7B7B7B]'>({formatTime(item.totalSec)})</span>
                  </span>
                </div>
              </li>
            ))}
        </ol>

        {/* Start 버튼 */}
        <button
          type='button'
          onClick={() => setOpenGuide(true)}
          className='mt-2 mb-1 h-10 w-full px-6 rounded-[10px] text-[13px] text-white bg-[#468FAF] cursor-pointer'
          aria-label='Start'
        >
          Start
        </button>
      </aside>

      {/* 운동 전 안내 사항 */}
      <RoutineGuideModal
        open={openGuide}
        onClose={() => setOpenGuide(false)}
        onStart={() => {
          setOpenGuide(false)
          navigate('/routine/today')
        }}
      />
    </>
  )
}

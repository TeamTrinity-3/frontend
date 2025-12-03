import { Clock } from 'lucide-react'
import { useRecommendExercises } from '@/hooks/user/useRecommendExercises'
import { useExerciseDetail } from '@/hooks/routine/useExerciseDetail'

// 총 소요시간 계산
function calcTotalSec(durationSec: number, sets: number, restSec: number) {
  const safeSets = sets || 1
  const safeDuration = durationSec || 0
  const safeRest = restSec || 0
  return safeDuration * safeSets + safeRest * Math.max(safeSets - 1, 0)
}

// 초 >> mm:ss
function formatTime(totalSec: number) {
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function Recommend() {
  const { data: exerciseIds } = useRecommendExercises()

  const id1 = exerciseIds?.[0]
  const id2 = exerciseIds?.[1]
  const id3 = exerciseIds?.[2]

  // 운동 상세 정보 훅을 3번 호출
  const { data: ex1 } = useExerciseDetail(id1)
  const { data: ex2 } = useExerciseDetail(id2)
  const { data: ex3 } = useExerciseDetail(id3)

  if (!id1 || !id2 || !id3 || !ex1 || !ex2 || !ex3) {
    return null
  }

  const cards = [
    { id: id1, detail: ex1 },
    { id: id2, detail: ex2 },
    { id: id3, detail: ex3 },
  ]

  return (
    <section className='mt-8 mb-10 max-[840px]:mb-4 max-[490px]:mt-6 max-[490px]:mb-2'>
      <h3 className='text-[15px] font-semibold mb-3 max-[490px]:text-sm'>
        오늘은 이 운동을 추천해드려요 :)
      </h3>

      <div className='grid gap-7 max-[490px]:gap-5 grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1'>
        {cards.map(({ id, detail }) => {
          const { exerciseName, intro, image, durationSec, sets, restSec } = detail
          const totalSec = calcTotalSec(durationSec, sets, restSec)
          const timeLabel = formatTime(totalSec)

          return (
            <article
              key={id}
              className='overflow-hidden rounded-[10px] border border-black/5 bg-white cursor-pointer'
              onClick={() => (window.location.href = `/routine/single/${id}`)}
            >
              {/* 이미지 */}
              <div className='relative w-full bg-[#ECEFF3] aspect-[16/9]'>
                {image && (
                  <img
                    src={image}
                    alt={exerciseName}
                    className='absolute inset-0 h-full w-full object-cover'
                  />
                )}
              </div>

              {/* 내용 */}
              <div className='p-3'>
                <div className='text-[13px] font-semibold'>{exerciseName}</div>
                <p className='mt-1 line-clamp-2 text-[12px] text-[#7B7B7B]'>{intro}</p>

                <div className='mt-3 flex items-center gap-2 text-[12px] font-semibold'>
                  <Clock size={14} />
                  <span>{timeLabel}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

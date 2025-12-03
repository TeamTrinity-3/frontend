import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useExerciseList } from '@/hooks/search/useExerciseList'
import { useExerciseSearch } from '@/hooks/search/useExerciseSearch'

type SearchResultProps = {
  targetArea?: string | null // FULL_BODY 같은 것, 없으면 전체 검색
  keyword?: string // 검색바에서 온 검색어 (없으면 카테고리)
  pageSize?: number // 기본 12, 화면에 따라 조절 가능
}

// targetArea 매핑
const CATEGORY_KEYWORD_MAP: Record<string, string | null> = {
  전체: null,
  전신: 'FULL_BODY',
  상체: 'UPPER_BODY',
  하체: 'LOWER_BODY',
  복부: 'ABDOMEN',
  가슴: 'CHEST',
  등: 'BACK',
  어깨: 'SHOULDERS',
  팔: 'ARMS',
  유산소: 'CARDIO',
}

// 초 >> mm:ss
const formatTime = (totalSec: number) => {
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function SearchResult({ targetArea, keyword, pageSize = 12 }: SearchResultProps) {
  const trimmed = (keyword ?? '').trim()
  // 카테고리 모드
  if (targetArea) {
    return <CategorySearchResult targetArea={targetArea} pageSize={pageSize} />
  }
  // 검색어가 카테고리인 경우
  if (trimmed && trimmed in CATEGORY_KEYWORD_MAP) {
    const mappedTargetArea = CATEGORY_KEYWORD_MAP[trimmed] // null이면 전체

    return <CategorySearchResult targetArea={mappedTargetArea} pageSize={pageSize} />
  }
  // 검색어 모드
  if (trimmed.length > 0) {
    return <KeywordSearchResult keyword={trimmed} pageSize={pageSize} />
  }
  return null
}

// 카테고리 모드
function CategorySearchResult({
  targetArea,
  pageSize,
}: {
  targetArea: string | null | undefined
  pageSize: number
}) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  // 카테고리가 바뀌면 첫 페이지로 리셋
  useEffect(() => {
    setPage(0)
  }, [targetArea])

  const { data } = useExerciseList({
    targetArea: targetArea || undefined, // 전체 검색이면 undefined
    page,
    size: pageSize,
  })

  const exercises = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const isFirst = data?.first ?? true
  const isLast = data?.last ?? true

  // 운동 카드 클릭하면 단일 운동 모드로 이동
  const handleCardClick = (exerciseId: number) => {
    navigate(`/routine/single/${exerciseId}`)
  }

  return (
    <section className='mt-8 mb-10 max-[490px]:mt-6 max-[490px]:mb-4'>
      <h3 className='text-[15px] font-semibold mb-3 max-[490px]:text-sm max-[840px]:hidden'>
        Search Results
      </h3>

      {exercises.length === 0 ? (
        <div className='py-12 text-center text-[12px] text-[#7B7B7B]'>검색 결과가 없습니다.</div>
      ) : (
        <div className='grid gap-7 max-[490px]:gap-5 grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1'>
          {exercises.map((e) => (
            <article
              key={e.exerciseId}
              onClick={() => handleCardClick(e.exerciseId)}
              className='overflow-hidden rounded-[10px] border border-black/5 bg-white cursor-pointer'
            >
              {/* 이미지 자리 */}
              <div className='relative w-full bg-[#ECEFF3] aspect-[16/9] overflow-hidden'>
                {e.image && (
                  <img src={e.image} alt={e.exerciseName} className='h-full w-full object-cover' />
                )}
              </div>

              {/* 내용 */}
              <div className='p-3'>
                <div className='text-[13px] font-semibold'>{e.exerciseName}</div>
                <p className='mt-1 line-clamp-2 text-[12px] text-[#7B7B7B]'>{e.intro}</p>

                <div className='mt-3 flex items-center gap-2 text-[12px] font-semibold'>
                  <Clock size={14} />
                  <span>{formatTime(e.totalSec)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {exercises.length > 0 && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          isFirst={isFirst}
          isLast={isLast}
          onChange={setPage}
        />
      )}
    </section>
  )
}

// 검색어 모드
function KeywordSearchResult({ keyword, pageSize }: { keyword: string; pageSize: number }) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  // 검색어가 바뀌면 첫 페이지로 리셋
  useEffect(() => {
    setPage(0)
  }, [keyword])

  const { data } = useExerciseSearch(keyword, page, pageSize)

  const exercises = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const isFirst = data?.first ?? true
  const isLast = data?.last ?? true

  // 운동 카드 클릭하면 단일 운동 모드로 이동
  const handleCardClick = (exerciseId: number) => {
    navigate(`/routine/single/${exerciseId}`)
  }

  return (
    <section className='mt-8 mb-10 max-[490px]:mt-6 max-[490px]:mb-4'>
      <h3 className='text-[15px] font-semibold mb-3 max-[490px]:text-sm max-[840px]:hidden'>
        Search Results
      </h3>

      {exercises.length === 0 ? (
        <div className='py-12 text-center text-[12px] text-[#7B7B7B]'>검색 결과가 없습니다.</div>
      ) : (
        <div className='grid gap-7 max-[490px]:gap-5 grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1'>
          {exercises.map((e) => (
            <article
              key={e.exerciseId}
              onClick={() => handleCardClick(e.exerciseId)}
              className='overflow-hidden rounded-[10px] border border-black/5 bg-white cursor-pointer'
            >
              {/* 이미지 자리 */}
              <div className='relative w-full bg-[#ECEFF3] aspect-[16/9] overflow-hidden'>
                {e.image && (
                  <img src={e.image} alt={e.exerciseName} className='h-full w-full object-cover' />
                )}
              </div>

              {/* 내용 */}
              <div className='p-3'>
                <div className='text-[13px] font-semibold'>{e.exerciseName}</div>
                <p className='mt-1 line-clamp-2 text-[12px] text-[#7B7B7B]'>{e.intro}</p>

                <div className='mt-3 flex items-center gap-2 text-[12px] font-semibold'>
                  <Clock size={14} />
                  <span>{formatTime(e.totalSec)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {exercises.length > 0 && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          isFirst={isFirst}
          isLast={isLast}
          onChange={setPage}
        />
      )}
    </section>
  )
}

// 페이지네이션 컴포넌트
type PaginationProps = {
  page: number
  totalPages: number
  isFirst: boolean
  isLast: boolean
  onChange: (next: number) => void
}

function Pagination({ page, totalPages, isFirst, isLast, onChange }: PaginationProps) {
  const goPrev = () => {
    if (!isFirst) onChange(Math.max(0, page - 1))
  }

  const goNext = () => {
    if (!isLast) onChange(page + 1)
  }

  return (
    <div className='mt-6 flex items-center justify-center gap-3 text-[12px]'>
      <button
        type='button'
        onClick={goPrev}
        disabled={isFirst}
        className='p-2 text-[#7B7B7B] disabled:opacity-30 cursor-pointer'
      >
        <ChevronLeft size={18} />
      </button>

      <div className='flex items-center gap-1'>
        {Array.from({ length: totalPages }, (_, idx) => {
          const isActive = idx === page
          return (
            <button
              key={idx}
              type='button'
              onClick={() => onChange(idx)}
              className={`h-7 w-7 rounded-full text-[12px] cursor-pointer ${
                isActive
                  ? 'bg-[#468FAF] text-white'
                  : 'bg-transparent text-[#000] hover:bg-[#F0F0F0]'
              }`}
            >
              {idx + 1}
            </button>
          )
        })}
      </div>

      <button
        type='button'
        onClick={goNext}
        disabled={isLast}
        className='p-2 text-[#7B7B7B] disabled:opacity-30 cursor-pointer'
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

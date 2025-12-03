import { useNavigate } from 'react-router-dom'
import { useTargetAreas } from '@/hooks/search/useTargetAreas'
import allIcon from '@/assets/icons/all.svg'

type SearchCategoryProps = {
  setKeyword: (value: string) => void
}

export default function SearchCategory({ setKeyword }: SearchCategoryProps) {
  const navigate = useNavigate()
  const { data: targetAreas } = useTargetAreas()

  const handleClick = (korName: string, engName?: string) => {
    setKeyword(korName)
    if (engName) {
      // 특정 카테고리 검색
      navigate(
        `/search?keyword=${encodeURIComponent(korName)}&targetArea=${encodeURIComponent(engName)}`,
      )
    } else {
      // 전체 카테고리 검색
      navigate(`/search?keyword=${encodeURIComponent(korName)}`)
    }
  }

  return (
    <section
      className='rounded-[10px] bg-[#F5F5F7] px-5 py-8 
                        max-[840px]:bg-[#FFFFFF] max-[840px]:mt-8 max-[840px]:mb-4 max-[490px]:mt-5 max-[490px]:mb-2'
    >
      {/* 그리드: 화면에 따라 칸수 설정 */}
      <div
        className='grid gap-x-2 gap-y-5 
                   grid-cols-[repeat(auto-fill,minmax(60px,1fr))]
                   min-[1080px]:grid-cols-[repeat(auto-fill,minmax(70px,1fr))]
                   min-[1280px]:grid-cols-[repeat(auto-fill,minmax(80px,1fr))]'
      >
        <button
          type='button'
          onClick={() => handleClick('전체')}
          className='flex flex-col items-center gap-1.5 cursor-pointer'
        >
          <div className='h-13 w-13 rounded-[10px] bg-[#EFEFEF] overflow-hidden flex items-center justify-center'>
            <img src={allIcon} alt='전체' className='h-10 w-10 object-contain' />
          </div>
          <span className='text-[12px] font-medium'>전체</span>
        </button>

        {targetAreas?.map((cat) => (
          <div
            key={cat.engName}
            onClick={() => handleClick(cat.korName, cat.engName)}
            className='flex flex-col items-center gap-1.5 cursor-pointer'
          >
            {/* 이미지 */}
            <div className='h-13 w-13 rounded-[10px] bg-[#EFEFEF] overflow-hidden'>
              {cat.image && (
                <img src={cat.image} alt={cat.korName} className='h-full w-full object-cover' />
              )}
            </div>
            <span className='text-[12px] font-medium'>{cat.korName}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

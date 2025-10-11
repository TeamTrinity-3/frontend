export default function SearchCategory() {
  // 더미 데이터
  const categories = [
    '전체',
    '전신',
    '가슴',
    '등',
    '어깨',
    '승모근',
    '이두근',
    '삼두근',
    '전완근',
    '허벅지',
    '엉덩이',
    '종아리',
    '복직근',
    '복사근',
    '하복부',
    '코어 전반',
    '허리',
    '골반저근',
    '흉곽 주변',
    '전거근',
  ]

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
        {categories.map((label, i) => (
          <div key={i} className='flex flex-col items-center gap-1.5'>
            {/* 이미지 자리 */}
            <div className='h-13 w-13 rounded-[10px] bg-[#EFEFEF]' aria-hidden />
            <span className='text-[12px] font-medium'>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

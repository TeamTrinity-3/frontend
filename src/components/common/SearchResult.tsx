import { Clock } from 'lucide-react'

export default function SearchResult() {
  // 더미 데이터
  const cards = [
    {
      title: '플랭크',
      time: '05:00',
      desc: '플랭크는 코어 근육을 강화하고 전신의 균형과 자세를 개선하는데 효과적입니다.',
    },
    {
      title: '윗몸 일으키기',
      time: '03:30',
      desc: '복근 강화와 코어 안정성 향상에 효과적이지만, 허리 건강에는 주의가 필요합니다.',
    },
    {
      title: '스쿼트',
      time: '08:00',
      desc: '스쿼트는 하체 근력 강화, 코어 활성화, 전신 체력 향상에 효과적이지만, 무릎이 약하거나 관절염이 있다면 주의해주세요.',
    },
    {
      title: '플랭크',
      time: '05:00',
      desc: '플랭크는 코어 근육을 강화하고 전신의 균형과 자세를 개선하는데 효과적입니다.',
    },
    {
      title: '윗몸 일으키기',
      time: '03:30',
      desc: '복근 강화와 코어 안정성 향상에 효과적이지만, 허리 건강에는 주의가 필요합니다.',
    },
    {
      title: '스쿼트',
      time: '08:00',
      desc: '스쿼트는 하체 근력 강화, 코어 활성화, 전신 체력 향상에 효과적이지만, 무릎이 약하거나 관절염이 있다면 주의해주세요.',
    },
  ]

  return (
    <section className='mt-8 mb-10 max-[490px]:mt-6 max-[490px]:mb-4'>
      <h3 className='text-[15px] font-semibold mb-3 max-[490px]:text-sm max-[840px]:hidden'>
        Search Results
      </h3>

      <div className='grid gap-7 max-[490px]:gap-5 grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1'>
        {cards.map((c, i) => (
          <article
            key={i}
            className='overflow-hidden rounded-[10px] border border-black/5 bg-white'
          >
            {/* 이미지 자리 */}
            <div className='relative w-full bg-[#ECEFF3] aspect-[16/9]' />

            {/* 내용 */}
            <div className='p-3'>
              <div className='text-[13px] font-semibold'>{c.title}</div>
              <p className='mt-1 line-clamp-2 text-[12px] text-[#7B7B7B]'>{c.desc}</p>

              <div className='mt-3 flex items-center gap-2 text-[12px] font-semibold'>
                <Clock size={14} />
                <span>{c.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

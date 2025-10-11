import type { ReactNode } from 'react'
import checkOn from '@/assets/icons/check-on.svg'

type TipsProps = {
  title?: string
  items: ReactNode[] // 각 항목 내용
  className?: string // 추가 커스터마이즈
}

export default function Tips({ title, items, className = '' }: TipsProps) {
  return (
    <section className={`ml-2 ${className}`}>
      <h2 className='font-semibold'>{title}</h2>

      <ul className='mt-3 space-y-4 max-[490px]:mt-2 max-[490px]:space-y-2'>
        {items.map((content, idx) => (
          <li key={idx} className='flex items-start gap-3'>
            <img src={checkOn} className='h-4 w-4 flex-none self-start mt-[4.5px]' />
            <p className='text-[13px] leading-6'>{content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

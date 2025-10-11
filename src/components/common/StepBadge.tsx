import type { ReactNode } from 'react'

type StepBadgeProps = {
  children: ReactNode // [1단계 - 운동이름] 라벨링
  className?: string // 추가 커스터마이즈
}

export default function StepBadge({ children, className = '' }: StepBadgeProps) {
  return (
    <span
      className={
        `inline-flex items-center rounded-[10px] px-4 py-2.5 ` +
        `text-white text-xs font-semibold ` +
        `bg-[#62A5C2] ${className}`
      }
    >
      {children}
    </span>
  )
}

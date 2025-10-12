import type { ReactNode } from 'react'

type SetBadgeProps = {
  children: ReactNode // [운동이름 - 세트수] 라벨링
  className?: string // 추가 커스터마이즈
}

export default function SetBadge({ children, className = '' }: SetBadgeProps) {
  return (
    <span
      className={
        `inline-flex items-center rounded-[10px] px-4 py-2.5 ` +
        `text-white text-xs font-medium ` +
        `bg-[#468FAF] ${className}`
      }
    >
      {children}
    </span>
  )
}

import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode // 모달 안에 표시될 내용
  className?: string
  closeOnOverlay?: boolean // 오버레이 클릭 시 모달을 닫을지
}

export default function Modal({
  open,
  onClose,
  children,
  className = '',
  closeOnOverlay = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden' // 스크롤 잠금
    requestAnimationFrame(() => panelRef.current?.focus()) // 포커스 이동

    return () => {
      document.body.style.overflow = prev // 모달 닫을 때 정리
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className='fixed inset-0 z-[100]'>
      {/* 오버레이 */}
      <div
        className='absolute inset-0 bg-black/50'
        aria-hidden='true'
        onClick={closeOnOverlay ? onClose : undefined}
      />
      {/* 모달 */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div
          ref={panelRef}
          role='dialog'
          aria-modal='true'
          tabIndex={-1}
          className={`w-full max-w-[380px] rounded-[10px] bg-white outline-none
                      max-[490px]:max-w-[min(92vw,380px)]
                      ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}

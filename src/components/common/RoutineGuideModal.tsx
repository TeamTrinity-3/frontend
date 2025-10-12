import { X } from 'lucide-react'
import Modal from '@/components/common/Modal'

type Props = {
  open: boolean
  onClose: () => void
  onStart: () => void
}

export default function RoutineGuideModal({ open, onClose, onStart }: Props) {
  const items = [
    '컨디션이 좋지 않을 때에는 휴식해주세요.',
    '운동을 시작하기 전 충분한 공간을 마련해주세요.',
    '스트레칭으로 근육과 관절을 풀어주세요.',
    '공복상태나 과식 직후 운동은 피해주세요.',
    '적절한 수분을 섭취해주세요.',
  ] as const

  return (
    <Modal open={open} onClose={onClose}>
      <div className='relative p-7'>
        <div className='flex items-center justify-between'>
          <h2 className='text-[15px] font-semibold'>운동 전 안내 사항</h2>
          <button
            type='button'
            onClick={onClose}
            className='grid place-items-center cursor-pointer'
          >
            <X size={18} />
          </button>
        </div>

        <ol className='mt-6 space-y-5'>
          {items.map((item, i) => (
            <li key={i} className='flex items-start gap-3'>
              <span className='inline-flex shrink-0 items-center justify-center h-7 w-7 rounded-full bg-[#A8D6E5] text-[13px] font-semibold'>
                {i + 1}
              </span>
              <p className='text-[13px] font-medium leading-6'>{item}</p>
            </li>
          ))}
        </ol>

        <p className='mt-5 text-[12px] text-[#FF0000] font-semibold'>
          ❗중간에 저장되지 않으며, 다시 시작하면 처음부터 진행됩니다.
        </p>

        <button
          type='button'
          onClick={onStart}
          className='mt-5 h-11 w-full rounded-[10px] text-white text-[13px] md:text-[14px] font-medium bg-[#468FAF] hover:bg-[#357893] cursor-pointer'
        >
          Start
        </button>
      </div>
    </Modal>
  )
}

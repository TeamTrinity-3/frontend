import { useNavigate } from 'react-router-dom'
import Modal from '@/components/common/Modal'

type Props = {
  open: boolean
  onClose: () => void
  onStart: () => void
}

export default function TestGuideModal({ open, onClose, onStart }: Props) {
  const navigate = useNavigate()

  const items = [
    '체력 측정 예상 소요 시간은 5분 입니다.',
    '본 체력 측정에서는 팔굽혀 펴기, 윗몸 일으키기, 스쿼트를 수행합니다. 해당 운동이 불가능할 경우 건너뛰기를 눌러주세요.',
    '운동을 시작하기 전 충분한 공간을 마련해주세요.',
    '이 테스트는 회원님의 체력 수준에 적절한 운동을 추천드리기 위함입니다. 무리하시거나 응답을 꾸며내실 경우 맞지 않는 운동량이 설정될 수 있습니다.',
    <>
      제한 시간 동안 해당 동작을 <span className='font-bold text-[#FF0004]'>몇 회</span> 하셨는지
      기억해주세요. 정확히 기억하지 못하실 경우 대략적인 횟수라도 적어주세요.
    </>,
  ] as const

  const handleSkip = () => {
    onClose()
    navigate('/home')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className='p-7'>
        <h2 className='text-[15px] font-semibold'>체력 측정 전 안내 사항</h2>

        <ol className='mt-5 space-y-3'>
          {items.map((item, i) => (
            <li key={i} className='flex items-start gap-3'>
              <span className='inline-flex shrink-0 items-center justify-center h-7 w-7 rounded-full bg-[#A8D6E5] text-[13px] font-semibold'>
                {i + 1}
              </span>
              <p className='text-[13px] font-medium leading-6'>{item}</p>
            </li>
          ))}
        </ol>

        <div className='mt-5 flex items-center justify-between'>
          <button
            type='button'
            onClick={handleSkip}
            className='text-[13px] font-medium text-[#888888] hover:text-black hover:underline underline-offset-3 decoration-1 cursor-pointer'
          >
            건너뛰기 &gt;
          </button>
          <button
            type='button'
            onClick={onStart}
            className='px-5 py-2 rounded-[10px] font-medium text-[13px] text-white bg-[#468FAF] cursor-pointer'
          >
            체력 측정 시작
          </button>
        </div>
      </div>
    </Modal>
  )
}

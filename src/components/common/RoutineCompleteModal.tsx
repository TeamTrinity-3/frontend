import { useNavigate } from 'react-router-dom'
import Modal from '@/components/common/Modal'

type Props = {
  open: boolean
  onClose: () => void
}

export default function TestGuideModal({ open, onClose }: Props) {
  const navigate = useNavigate()

  const handleCheck = () => {
    onClose()
    navigate('/home')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col items-center p-8 mt-4'>
        <img
          src='/src/assets/Images/good-Fiti.svg'
          className='w-35 h-35 md:w-40 md:h-40 object-contain select-none'
          draggable={false}
        />

        <h3 className='mt-4 text-base md:text-lg font-semibold'>운동이 끝났어요!🥳</h3>

        <p className='mt-2 leading-5 text-center text-[13px] md:text-[14px] text-[#7B7B7B] font-medium'>
          코어 및 민첩성이 향상되었어요!
          <br />
          내일 운동도 잊지 마세요😉
        </p>

        <button
          type='button'
          onClick={handleCheck}
          className='mt-8 h-11 w-full rounded-[10px] text-white text-[13px] md:text-[14px] font-medium bg-[#468FAF] hover:bg-[#357893] cursor-pointer'
        >
          확인
        </button>
      </div>
    </Modal>
  )
}

import { useNavigate } from 'react-router-dom'
import Modal from '@/components/common/Modal'
import { usePatchPlanProgress } from '@/hooks/routine/usePatchPlanProgress'
import goodFiti from '@/assets/Images/good-Fiti.svg'

type Props = {
  open: boolean
  onClose: () => void
  planId?: number
}

export default function RoutineCompleteModal({ open, onClose, planId }: Props) {
  const navigate = useNavigate()
  const { mutate: patchPlan } = usePatchPlanProgress()

  const handleCheck = () => {
    onClose()

    // 싱글모드면 api 호출 안함
    if (!planId) {
      navigate('/home')
      return
    }

    // 운동 완료 후 상태 patch
    patchPlan(planId, {
      onSuccess: () => {
        navigate('/home')
      },
      onError: (err: any) => {
        const status = err.response?.data?.status
        if (status === 409) {
          alert('이미 완료한 운동입니다.')
        } else if (status === 403) {
          alert('오늘의 운동 일정이 아닙니다.')
        } else {
          alert('처리 중 오류가 발생했습니다.')
        }
        navigate('/home')
      },
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col items-center p-8 mt-4'>
        <img
          src={goodFiti}
          className='w-35 h-35 md:w-40 md:h-40 object-contain select-none'
          draggable={false}
        />

        <h3 className='mt-4 text-base md:text-lg font-semibold'>운동이 끝났어요!🥳</h3>

        <p className='mt-2 leading-5 text-center text-[13px] md:text-[14px] text-[#7B7B7B] font-medium'>
          어제보다 성장하셨네요!
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

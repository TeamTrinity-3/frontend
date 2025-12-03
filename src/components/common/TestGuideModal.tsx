import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Modal from '@/components/common/Modal'
import { useGenerateRoutine } from '@/hooks/routine/useGenerateRoutine'

type Props = {
  open: boolean
  onClose: () => void
  onStart: () => void
}

export default function TestGuideModal({ open, onClose, onStart }: Props) {
  const navigate = useNavigate()

  const { mutate: generateRoutine, isPending } = useGenerateRoutine() // 7일치 루틴 생성

  const items = [
    '체력 측정은 약 15~20분 소요됩니다.',
    '플랭크, 의자 앉았다 일어나기, 푸쉬업, Step 테스트, 허리 숙여 손끝 닿기, 눈 감고 한 발 서기를 측정합니다. 해당 운동이 불가능할 경우 건너뛰기를 눌러주세요.',
    '운동을 시작하기 전 충분한 공간을 마련해주세요.',
    '이 테스트는 회원님의 체력 수준에 적절한 운동을 추천드리기 위함입니다. 무리하시거나 응답을 꾸며내실 경우 맞지 않는 운동량이 설정될 수 있습니다.',
    <>
      제한 시간 동안 해당 동작을 <span className='font-bold text-[#FF0004]'>몇 회</span> 하셨는지
      기억해주세요. 정확히 기억하지 못하실 경우 대략적인 횟수라도 적어주세요.
    </>,
  ] as const

  const handleSkip = () => {
    const ok = window.confirm(
      '체력 측정을 건너뛰면 건강 정보를 기반으로 운동 루틴이 생성됩니다.\n계속하시겠습니까?',
    )
    if (!ok) return

    generateRoutine(undefined, {
      onSuccess: (message) => {
        alert(message)
        onClose()
        navigate('/home')
      },
    })
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
            disabled={isPending}
          >
            {isPending ? (
              <span className='flex items-center gap-1'>
                <Loader2 className='h-4 w-4 animate-spin' />
                생성중...
              </span>
            ) : (
              <>건너뛰기 &gt;</>
            )}
          </button>
          <button
            type='button'
            onClick={onStart}
            className='px-5 py-2 rounded-[10px] font-medium text-[13px] text-white bg-[#468FAF] cursor-pointer'
            disabled={isPending}
          >
            체력 측정 시작
          </button>
        </div>
      </div>
    </Modal>
  )
}

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ThirdPartyTerms() {
  const navigate = useNavigate()

  return (
    <div className='max-w-2xl mx-auto px-6 py-4'>
      {/* heading */}
      <div className='relative flex items-center mb-5'>
        <button
          onClick={() => navigate(-1)}
          className='absolute left-0 text-[#6E6E6E] cursor-pointer'
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className='mx-auto font-semibold'>개인정보 제3자 제공 동의</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>
          <span className='font-medium text-[#468FAF]'>MoFit 서비스</span>는 보다 원활한 서비스
          제공을 위해 아래와 같이 이용자의 개인정보를 제3자에게 제공할 수 있습니다. 이용자는 해당
          동의를 거부할 권리가 있으며, 동의를 거부하실 경우 일부 서비스 이용에 제한이 있을 수
          있습니다.
        </p>

        <div className='bg-gray-50 border border-gray-200 rounded-[5px] p-5 space-y-2'>
          <p className='font-medium'>[ 개인정보 제3자 제공 내역 ]</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>제공받는 자: 서비스 운영 및 제휴 파트너사</li>
            <li>제공 목적: 회원 관리, 맞춤형 서비스 제공, 알림 발송, 통계 분석</li>
            <li>제공 항목: 이름, 이메일, 건강 관련 정보(선택 입력 항목 포함)</li>
            <li>보유 및 이용 기간: 회원 탈퇴 시 또는 제공 목적 달성 시까지</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

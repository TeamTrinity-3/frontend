import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function MarketingTerms() {
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
        <h2 className='mx-auto font-semibold'>마케팅 활용 동의</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>
          마케팅 정보 수신 여부 및 마케팅을 위한 개인정보 수집·이용을 거부하실 수 있으며, 거부
          시에도 <span className='font-medium text-[#468FAF]'>MoFit 서비스</span>를 이용하실 수
          있습니다. 다만, 동의를 거부한 경우 각종 소식 및 이벤트 참여에 제한이 있을 수 있습니다.
        </p>

        <div className='bg-gray-50 border border-gray-200 rounded-[5px] p-5 space-y-2'>
          <p className='font-medium'>[ 서비스 소식, 이벤트 등 광고성 정보 안내 목적 ]</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>수집항목: (선택) 마케팅 수신 이메일 주소</li>
            <li>보유기간: 동의 철회 또는 회원탈퇴 시</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

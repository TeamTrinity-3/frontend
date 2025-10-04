import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function SensitiveTerms() {
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
        <h2 className='mx-auto font-semibold'>민감정보 수집/이용 동의</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>
          주식회사 MoFit은 서비스 이용자의 개인정보를 중요시하며, 「개인정보보호법」, 「정보통신망
          이용촉진 및 정보보호 등에 관한 법률」등 관련 법규에 의거하여 아래의 서비스 이용 시
          민감정보를 수집 및 이용합니다.
        </p>

        <div className='bg-gray-50 border border-gray-200 rounded-[5px] p-5 space-y-2'>
          <p className='font-medium'>[ 맞춤정보 제공, 통계데이터 활용 목적 ]</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>수집항목: (필수) 질환코드, 운동 데이터</li>
            <li>보유기간: 회원탈퇴 시</li>
          </ul>
        </div>

        <p className='text-xs'>
          ※위의 민감정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할
          경우 일부 서비스에 제한이 생길 수 있습니다.
        </p>
      </div>
    </div>
  )
}

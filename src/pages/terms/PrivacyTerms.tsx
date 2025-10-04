import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyTerms() {
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
        <h2 className='mx-auto font-semibold'>개인정보 수집/이용 동의</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>
          주식회사 MoFit은 <span className='font-medium text-[#468FAF]'>MoFit 서비스</span> 이용자의
          개인정보를 중요시하며, 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한
          법률」등 관련 법규에 의거하여 서비스 이용자의 회원가입 시 아래와 같이 개인정보를 수집 및
          이용합니다.
        </p>

        <div className='bg-gray-50 border border-gray-200 rounded-[5px] p-5 space-y-2'>
          <p className='font-medium'>[ 회원가입 및 관리 및 간편로그인 목적 ]</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>수집항목: (필수) 이메일, CI, DI, 성명, 생년월일, 성별</li>
            <li>보유기간: 회원탈퇴 시</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

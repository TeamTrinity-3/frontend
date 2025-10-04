import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ServiceTerms() {
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
        <h2 className='mx-auto font-semibold'>서비스 이용 약관</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>
          <span className='font-medium'>제1조 (목적)</span>
          <br />본 약관은 MoFit(이하 '회사')이 제공하는 MoFit 서비스(이하 "MoFit" 혹은 "서비스"라
          함)를 이용하는데 필요한 권리, 의무 및 책임사항, 이용 조건 및 절차 등 기본적인 사항을
          규정하고 있습니다. 서비스를 이용하거나 서비스 회원으로 가입할 경우 여러분은 본 약관 및
          관련 운영 정책을 확인하거나 동의하게 되므로, 조금만 시간을 내서 주의 깊게 읽어주시길
          바랍니다.
        </p>
        <p>
          <span className='font-medium'>제2조 (정의)</span>
          <br />
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <br />
          1."서비스"란 구현되는 단말기(PC, 휴대형단말기 등의 유무선 장치를 포함)와 상관없이
          "이용자"가 이용할 수 있는 MoFit와 관련한 제반 서비스를 의미합니다.
          <br />
          2."이용자"라 함은 "회사"에서 제공하는 서비스 또는 관련 제반 서비스를 이용하는 "회원"과
          비회원을 말합니다.
        </p>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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
        <h2 className='mx-auto font-semibold'>개인정보처리방침</h2>
      </div>

      {/* context */}
      <div className='space-y-5 text-sm leading-relaxed'>
        <p>MoFit은 고객님들의 소중한 개인정보 보호를 위해 아래와 같은 방침을 수행하고 있습니다.</p>

        <section className='space-y-2'>
          <h3 className='font-medium'>1. 개인정보의 처리 목적</h3>
          <p>
            (주)트리니티 (&lsquo;www.mefoweb.com&rsquo;이하 &lsquo;MoFit&rsquo;)는 다음의 목적을
            위하여 개인정보를 처리하고 있으며, 다음 목적 이외의 용도로는 이용하지 않습니다.
          </p>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리
              등
            </li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h3 className='font-medium'>2. 개인정보의 처리 및 보유 기간</h3>
          <p>
            ① &lsquo;MoFit&rsquo;은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보
            보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.
          </p>
          <p>② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
          <ul className='list-disc list-inside space-y-1'>
            <li>고객 가입 및 관리 : 회원가입 및 관리</li>
            <li>보유 기간 : 회원 탈퇴 시, 즉시 삭제</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import check_on from '@/assets/icons/check-on.svg'
import check_off from '@/assets/icons/check-off.svg'

export default function TermsAgreement() {
  const navigate = useNavigate()

  const [terms, setTerms] = useState([
    { id: 1, text: '서비스 이용 약관', required: true, checked: false, link: '/terms/service' },
    {
      id: 2,
      text: '개인정보 수집/이용 동의',
      required: true,
      checked: false,
      link: '/terms/privacy',
    },
    {
      id: 3,
      text: '민감정보 수집/이용 동의',
      required: true,
      checked: false,
      link: '/terms/sensitive',
    },
    { id: 4, text: '마케팅 활용 동의', required: false, checked: false, link: '/terms/marketing' },
  ])
  const [agreeAll, setAgreeAll] = useState(false)

  // 개별 약관 동의
  const toggleTerm = (id: number) => {
    const updated = terms.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    setTerms(updated)

    const allChecked = updated.every((t) => t.checked)
    setAgreeAll(allChecked)
  }

  // 전체 동의
  const toggleAll = () => {
    const newAgreeAll = !agreeAll
    setAgreeAll(newAgreeAll)

    const updated = terms.map((t) => ({ ...t, checked: newAgreeAll }))
    setTerms(updated)
  }

  return (
    <section>
      <ul>
        {terms.map((t) => (
          <li key={t.id} className='flex items-center justify-between px-2 py-3'>
            <div className='flex items-center gap-3' onClick={() => toggleTerm(t.id)}>
              <img
                src={t.checked ? check_on : check_off}
                alt={t.checked ? 'checked' : 'unchecked'}
                className='h-4 w-4 cursor-pointer'
                draggable={false}
              />
              <span className='text-sm cursor-pointer' onClick={() => navigate(t.link)}>
                <span>{t.required ? '[필수] ' : '[선택] '}</span>
                {t.text}
              </span>
            </div>

            <ChevronRight
              className='h-4 w-4 text-[#6E6E6E] cursor-pointer'
              onClick={() => navigate(t.link)}
            />
          </li>
        ))}
      </ul>

      <hr className='mt-2 mb-2 border-t-[1.5px] border-[#ECECEC]' />

      <div className='flex w-full items-center gap-3 px-2 py-3' onClick={toggleAll}>
        <img
          src={agreeAll ? check_on : check_off}
          alt={agreeAll ? 'all-checked' : 'all-unchecked'}
          className='h-4 w-4 cursor-pointer'
          draggable={false}
        />
        <span className='text-sm'>모든 약관에 동의합니다.</span>
      </div>
    </section>
  )
}

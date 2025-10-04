import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { s } from './StepHealthIssue.styles'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import Checklist from '@/components/common/Checklist'
import step3 from '@/assets/progress/step3.svg'

export default function StepHealthIssue() {
  const navigate = useNavigate()
  const [hypotension, setHypotension] = useState('')
  const [injury, setInjury] = useState('')
  const [exercise, setExercise] = useState('')

  return (
    <SidebarProvider>
      <div className='min-h-screen'>
        <div className='max-[1290px]:hidden'>
          <AppSidebar logoOnly />
        </div>

        <SidebarInset>
          {/* 오른쪽 여백 */}
          <aside className={s.aside} />

          <div className={s.main}>
            <div className='h-svh overflow-y-auto'>
              <div className={s.grid}>
                <div className='order-2 min-[1100px]:order-1'>
                  <div className='mb-6'>
                    <p className={s.caption}>회원가입</p>
                    <h1 className={s.title}>건강 이슈 체크</h1>
                  </div>

                  <section className={s.section}>
                    <div>
                      <p className={s.label}>
                        다음과 같은 질병으로 진단을 받았거나, 현재 약물 치료 중이신가요?
                      </p>
                      <Checklist
                        options={[
                          { id: 'stroke', label: '뇌졸중(중풍)' },
                          { id: 'heart', label: '심장병(심근경색/협심증)' },
                          { id: 'htn', label: '고혈압' },
                          { id: 'dm', label: '당뇨병' },
                          { id: 'dyslipidemia', label: '이상지질혈증' },
                          { id: 'tb', label: '폐결핵' },
                          { id: 'cancer', label: '암' },
                        ]}
                      />
                    </div>

                    <div>
                      <p className={s.label}>
                        부모, 형제, 자매 중에 다음 질환을 앓았거나 해당 질환으로 사망한 경우가
                        있으십니까?
                      </p>
                      <Checklist
                        options={[
                          { id: 'stroke', label: '뇌졸중(중풍)' },
                          { id: 'heart', label: '심장병(심근경색/협심증)' },
                          { id: 'htn', label: '고혈압' },
                          { id: 'dm', label: '당뇨병' },
                          { id: 'cancer', label: '암' },
                        ]}
                      />
                    </div>
                  </section>

                  <div className={`${s.section} min-[1100px]:hidden`}>
                    <div className='mt-6 mb-6'>
                      <p className={s.label}>
                        최근 3개월 이내에 저혈압으로 인한 어지럼증이나 기립성 어지럼을 경험하신 적이
                        있나요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${hypotension === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setHypotension('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${hypotension === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setHypotension('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={s.label}>
                        최근 통증이나 진단으로 인해 운동이 제한되는 부위가 있나요?
                      </p>
                      <Checklist
                        options={[
                          { id: 'knee', label: '무릎' },
                          { id: 'waist', label: '허리(요추/디스크/요통)' },
                          { id: 'shoulder', label: '어깨(충돌/회전근개)' },
                        ]}
                      />
                    </div>

                    <div className='mt-6 mb-6'>
                      <p className={s.label}>
                        최근 3개월 이내에 수술·골절·급성 염좌(삐끗함)로 치료를 받았거나 회복
                        중이신가요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${injury === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setInjury('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${injury === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setInjury('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>

                    <div className='mb-10'>
                      <p className={s.label}>
                        의사로부터 "격렬한 운동을 피하세요" 또는 "운동을 제한하세요"라는 권고를
                        받으신 적이 있나요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${exercise === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setExercise('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${exercise === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setExercise('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`${s.submit} min-[1100px]:hidden mb-8`}
                    type='submit'
                    onClick={() => navigate('/signup/profile')}
                  >
                    다음
                  </Button>
                </div>

                <div className='order-1 min-[1100px]:order-2 flex flex-col justify-between'>
                  <img src={step3} alt='회원가입 3단계' className={s.stepImg} draggable={false} />

                  <div className={`${s.section} hidden min-[1100px]:block`}>
                    <div className='mt-10 mb-8'>
                      <p className={s.label}>
                        최근 3개월 이내에 저혈압으로 인한 어지럼증이나 기립성 어지럼을 경험하신 적이
                        있나요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${hypotension === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setHypotension('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${hypotension === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setHypotension('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className={s.label}>
                        최근 통증이나 진단으로 인해 운동이 제한되는 부위가 있나요?
                      </p>
                      <Checklist
                        options={[
                          { id: 'knee', label: '무릎' },
                          { id: 'waist', label: '허리(요추/디스크/요통)' },
                          { id: 'shoulder', label: '어깨(충돌/회전근개)' },
                        ]}
                      />
                    </div>

                    <div className='mt-8 mb-8'>
                      <p className={s.label}>
                        최근 3개월 이내에 수술·골절·급성 염좌(삐끗함)로 치료를 받았거나 회복
                        중이신가요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${injury === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setInjury('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${injury === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setInjury('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>

                    <div className='mb-10'>
                      <p className={s.label}>
                        의사로부터 "격렬한 운동을 피하세요" 또는 "운동을 제한하세요"라는 권고를
                        받으신 적이 있나요?
                      </p>
                      <div className='flex gap-3'>
                        <button
                          type='button'
                          className={`${s.gender} ${exercise === '네' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setExercise('네')
                          }}
                        >
                          네
                        </button>
                        <button
                          type='button'
                          className={`${s.gender} ${exercise === '아니오' ? 'bg-[#468FAF] text-white' : 'bg-[#E6E6E6] text-black'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setExercise('아니오')
                          }}
                        >
                          아니오
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`${s.submit} hidden min-[1100px]:block`}
                    type='submit'
                    onClick={() => navigate('/signup/profile')}
                  >
                    다음
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

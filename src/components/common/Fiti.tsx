import trainingFiti from '@/assets/Images/training-Fiti.svg'

export default function Fiti() {
  return (
    <div className='w-full rounded-[10px] bg-[#EAEAEF] p-13 max-[980px]:px-8 max-[980px]:py-20 flex flex-col items-center'>
      <div className='w-[350px] h-[400px] max-[980px]:w-[250px] max-[980px]:h-[280px] relative'>
        <img
          src={trainingFiti}
          className='w-full h-full object-contain select-none pointer-events-none'
          draggable={false}
        />
      </div>
    </div>
  )
}

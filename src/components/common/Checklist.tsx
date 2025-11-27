import { useState, useEffect } from 'react'
import check_on from '@/assets/icons/check-on.svg'
import check_off from '@/assets/icons/check-off.svg'

type Option = { id: string; label: string }

type ChecklistProps = {
  title?: string
  options: Option[]
  multiple?: boolean
  value?: string[]
  onChange?: (next: string[]) => void
}

export default function Checklist({ options, multiple, value, onChange }: ChecklistProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const selected = value ?? internalSelected

  useEffect(() => {
    if (value) {
      setInternalSelected(value)
    }
  }, [value])

  const toggle = (id: string) => {
    let next: string[]

    if (multiple) {
      // 다중 선택
      next = selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]
    } else {
      // 단일 선택 모드
      next = selected.includes(id) ? [] : [id]
    }

    if (value === undefined) {
      setInternalSelected(next)
    }
    onChange?.(next)
  }

  return (
    <div className='rounded-[15px] bg-[#F3F3F3]'>
      <ul className='px-5 py-1'>
        {options.map((opt, i) => (
          <li key={opt.id}>
            <div
              className='flex items-center justify-between px-3 py-3 cursor-pointer'
              onClick={() => toggle(opt.id)}
            >
              <span className='text-sm max-[490px]:text-xs'>{opt.label}</span>
              <img
                src={selected.includes(opt.id) ? check_on : check_off}
                alt={selected.includes(opt.id) ? 'checked' : 'unchecked'}
                className='h-4 w-4'
                draggable={false}
              />
            </div>
            {i !== options.length - 1 && <hr className='border-t-[1.5px] border-[#E1E1E1]' />}
          </li>
        ))}
      </ul>
    </div>
  )
}

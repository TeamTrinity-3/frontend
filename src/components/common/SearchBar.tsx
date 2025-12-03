import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SearchBarProps = {
  keyword: string
  setKeyword: (value: string) => void
}

export default function SearchBar({ keyword, setKeyword }: SearchBarProps) {
  const navigate = useNavigate()

  const handleSearch = () => {
    const trimmed = keyword.trim()
    if (!trimmed) return

    navigate(`/search?keyword=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className='mt-6 mb-6 max-[840px]:mt-0 max-[840px]:mb-0'>
      <div className='relative'>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          placeholder='찾는 운동이 뭐예요?'
          className='w-full h-11 rounded-full text-[12px] bg-[#EFEFEF] px-6 pr-12
                     outline-none ring-0 focus:ring-1 focus:ring-[#CBCBCB]'
        />
        <button
          type='button'
          aria-label='검색'
          onClick={handleSearch}
          className='absolute right-5 top-1/2 -translate-y-1/2
                     place-items-center text-[#7B7B7B] cursor-pointer'
        >
          <Search size={16} />
        </button>
      </div>
    </div>
  )
}

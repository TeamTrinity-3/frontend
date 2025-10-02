import { useState } from 'react'
import { Button } from '../components/ui/button' // 별칭(@) 안 쓰는 안전한 상대경로

export default function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Home</h1>
      <div className='rounded-xl border p-4'>
        <p className='text-sm'>
          count is <span className='font-semibold'>{count}</span>
        </p>
        <div className='mt-2 flex gap-2'>
          <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
          <Button variant='outline' onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

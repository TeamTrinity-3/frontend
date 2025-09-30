import { useState } from 'react'
import { Button } from '@/components/ui/button' // shadcn 버튼

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='min-h-dvh flex items-center justify-center bg-background text-foreground'>
      <div className='w-full max-w-md space-y-6 p-6'>
        <header className='space-y-1'>
          <h1 className='text-3xl font-bold'>MoFit</h1>
          <p className='text-sm text-muted-foreground'>Vite + React + Tailwind + shadcn/ui</p>
        </header>

        <section className='rounded-xl border p-4 space-y-4'>
          <p className='text-sm'>
            count is <span className='font-semibold'>{count}</span>
          </p>
          <div className='flex gap-2'>
            <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
            <Button variant='outline' onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </section>

        <p className='text-xs text-muted-foreground'>
          Edit <code className='rounded bg-muted px-1 py-0.5'>src/App.tsx</code> and save to test
          HMR
        </p>
      </div>
    </main>
  )
}

export default App

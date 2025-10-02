import { NavLink, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/login/Login'
import NotFound from '@/pages/NotFound'

function App() {
  // const link = ({ isActive }: { isActive: boolean }) =>
  //   isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'

  return (
    <>
      {/* <header className='border-b'>
        <div className='mx-auto flex max-w-5xl items-center justify-between p-4'>
          <NavLink to='/' className='text-xl font-bold'>
            MoFit
          </NavLink>
          <nav className='flex gap-4 text-sm'>
            <NavLink to='/' className={link}>
              Login
            </NavLink>
            <NavLink to='/home' className={link}>
              Home
            </NavLink>
          </nav>
        </div>
      </header> */}

      <main className='mx-auto max-w-5xl px-4'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Login from '@/pages/login/Login'
import ResetPasswordRequest from '@/pages/login/ResetPasswordRequest'
import ResetPasswordConfirm from '@/pages/login/ResetPasswordConfirm'
import StepAccount from '@/pages/signup/StepAccount'
import StepProfile from '@/pages/signup/StepProfile'
import StepHealthInfo from '@/pages/signup/StepHealthInfo'
import StepHealthIssue from '@/pages/signup/StepHealthIssue'

import FitnessTest from '@/pages/fitness-test/FitnessTest'
import FitnessTestLoading from '@/pages/fitness-test/FitnessTestLoading'
import FitnessTestResult from '@/pages/fitness-test/FitnessTestResult'

import MarketingTerms from '@/pages/terms/MarketingTerms'
import PrivacyTerms from '@/pages/terms/PrivacyTerms'
import SensitiveTerms from '@/pages/terms/SensitiveTerms'
import ServiceTerms from '@/pages/terms/ServiceTerms'

import Home from '@/pages/Home'
import Search from '@/pages/Search'

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
          <Route path='/resetPW/request' element={<ResetPasswordRequest />} />
          <Route path='/resetPW/confirm' element={<ResetPasswordConfirm />} />
          <Route path='/signup/account' element={<StepAccount />} />
          <Route path='/signup/profile' element={<StepProfile />} />
          <Route path='/signup/health/info' element={<StepHealthInfo />} />
          <Route path='/signup/health/issue' element={<StepHealthIssue />} />

          <Route path='/fitness/test' element={<FitnessTest />} />
          <Route path='/fitness/test/loading' element={<FitnessTestLoading />} />
          <Route path='/fitness/test/result' element={<FitnessTestResult />} />

          <Route path='/terms/marketing' element={<MarketingTerms />} />
          <Route path='/terms/privacy' element={<PrivacyTerms />} />
          <Route path='/terms/sensitive' element={<SensitiveTerms />} />
          <Route path='/terms/service' element={<ServiceTerms />} />

          <Route path='/home' element={<Home />} />
          <Route path='/Search' element={<Search />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App

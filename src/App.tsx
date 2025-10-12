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
import PrivacyPolicy from '@/pages/policy/PrivacyPolicy'

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import MyPage from '@/pages/MyPage'
import Settings from '@/pages/Settings'

import RoutineRunner from '@/pages/routine/RoutineRunner'

import NotFound from '@/pages/NotFound'

function App() {
  return (
    <>
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
          <Route path='/policy/privacy' element={<PrivacyPolicy />} />

          <Route path='/home' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/settings' element={<Settings />} />

          <Route path='/routine/today' element={<RoutineRunner />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App

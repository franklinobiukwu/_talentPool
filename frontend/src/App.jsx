import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import LandingPageLayout from './layouts/LandingPageLayout'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RequireAuth from "./hooks/RequireAuth"
import PreventDisplayAuth from "./hooks/PreventDisplayAuth"
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
      <BrowserRouter>
        <Routes>
            {/* Landing Page and Public Routes */}
            <Route path="/" element={<LandingPageLayout/>}>
                <Route index element={<LandingPage/>}/>
                <Route element={<PreventDisplayAuth/>}>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='signup' element={<SignupPage/>}/>
                </Route>
            </Route>
            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
                <Route path="dashboard" element={<DashboardLayout/>}>
                    <Route path='profile' element={<ProfilePage/>}/>
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

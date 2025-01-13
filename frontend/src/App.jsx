import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import LandingPageLayout from './layouts/LandingPageLayout'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RequireAuth from "./hooks/RequireAuth"
import PreventDisplayAuth from "./hooks/PreventDisplayAuth"

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPageLayout/>}>
                <Route index element={<LandingPage/>}/>
                <Route element={<PreventDisplayAuth/>}>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='signup' element={<SignupPage/>}/>
                </Route>
            </Route>
            <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<DashboardLayout/>}>
            </Route>
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import LandingPageLayout from './layouts/LandingPageLayout'
import LandingPage from './pages/LandingPage'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPageLayout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path='login' element={<LoginPage/>}/>
            </Route>
            <Route path="/dashboard" element={<DashboardLayout/>}>
            </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

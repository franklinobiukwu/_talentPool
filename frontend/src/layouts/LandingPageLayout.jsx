import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const LandingPageLayout = () => {
    return (
        <div 
            className="flex flex-col h-screen">
            {/* Nav Bar */}
            <div className="flex-none">
                <Navbar/>
            </div>
            {/* Sections */}
            <div className="flex-grow">
                <Outlet/>
            </div>
        </div>
    )
}

export default LandingPageLayout

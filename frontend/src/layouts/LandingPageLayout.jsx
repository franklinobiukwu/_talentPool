import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const LandingPageLayout = () => {
    return (
        <div>
            {/* Nav Bar */}
            <Navbar/>
            {/* Sections */}
            <Outlet/>
        </div>
    )
}

export default LandingPageLayout

import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
//import { useQueryClient } from "@tanstack/react-query"

const LandingPageLayout = () => {
    //const queryClient = useQueryClient()

    //const userData = queryClient.getQueryData(["user"])
    const userData = JSON.parse(localStorage.getItem("user"))
    const user = userData ? {...userData, _id: undefined, token: undefined } : null

    return (
        <div 
            className="flex flex-col h-screen">
            {/* Nav Bar */}
            <div className="flex-none z-10">
                <Navbar user={user}/>
            </div>
            {/* Sections */}
            <div className="flex-grow">
                <Outlet/>
            </div>
        </div>
    )
}

export default LandingPageLayout

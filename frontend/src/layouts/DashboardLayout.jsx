import { Outlet } from "react-router";
import SideNav from "../components/SideNav.jsx";
import { useEffect } from 'react'
import { refreshToken } from "../hooks/utilityFns.jsx";


const DashboardLayout = () =>
{
    // Automatically refresh access token on app load
    useEffect(() => {
        refreshToken()
    }, [])

    return (
        <div>
            <div className="grid grid-cols-12">
                {/*---------SideNav-------------*/}
                <div className="md:col-span-2 col-span-3 fixed">
                    <SideNav/>
                </div>
                {/*---------Main Content--------*/}
                <div className="md:col-span-10 md:col-start-4 col-span-9">
                    <Outlet/>
                </div>
            </div>
        </div>
    )    
}
export default DashboardLayout

import { Navigate, Outlet, useLocation } from "react-router"

// Function to prevent logged in users from viewing pages
// like signup and login pages
const PreventDisplayAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const location = useLocation()

    return (
        user ? <Navigate to="/" state={{ from: location }} replace/> : <Outlet/>
    )
}
export default PreventDisplayAuth

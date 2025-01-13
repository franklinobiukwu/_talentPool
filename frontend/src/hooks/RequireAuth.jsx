import { Navigate, Outlet, useLocation } from "react-router"

const RequireAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const location = useLocation()

    return (
        user ? (<Outlet/>) : <Navigate to="/" state={{ from: location }} replace/>
    )
}
export default RequireAuth

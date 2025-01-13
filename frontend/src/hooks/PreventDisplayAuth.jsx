import { Navigate, Outlet, useLocation } from "react-router"

const PreventDisplayAuth = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const location = useLocation()

    return (
        user ? <Navigate to="/" state={{ from: location }} replace/> : <Outlet/>
    )
}
export default PreventDisplayAuth

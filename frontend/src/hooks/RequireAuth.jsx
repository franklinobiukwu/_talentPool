import { Navigate, Outlet, useLocation } from "react-router";
import { getAccessToken, api } from "./utilityFns.jsx";
import { useQuery } from "@tanstack/react-query";

// Fetch Personal Profile
const fetchPersonalProfile = async () => {
    const accessToken = getAccessToken()
    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.get(`/user/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return response.data
};

const RequireAuth = () => {

    const accessToken = getAccessToken()
    const location = useLocation()

    const { isError } = useQuery({
        queryKey: ["auth-user"],
        queryFn: fetchPersonalProfile,
        enabled: !!accessToken, // Only run query if accessToken exists
        retry: false, // Prevent infinite retry loops on failure
        cacheTime: 0,
        staleTime: 0
    })

    // Handle unauthorized users
    if (!accessToken || isError) {
        console.log("User not authenticated. Redirecting...")
        localStorage.removeItem("user"); // Remove user data
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />
};

export default RequireAuth

import { Navigate, Outlet, useLocation } from "react-router";
import { getAccessToken, api } from "./utilityFns.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Fetch Personal Profile
const fetchPersonalProfile = async () => {
    const accessToken = getAccessToken()
    if (!accessToken) throw new Error("No accessToken found")
    console.log("About to fetch user profile")

    const response = await api.get(`/user/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    console.log("response.data:", response.data)
    return response.data
};

const RequireAuth = () => {

    const accessToken = getAccessToken()
    console.log({accessToken})
    const location = useLocation()

    const { isError, error } = useQuery({
        queryKey: ["auth-user"],
        queryFn: fetchPersonalProfile,
        enabled: !!accessToken, // Only run query if accessToken exists
        retry: false, // Prevent infinite retry loops on failure
        staleTime: 5 * 60 * 1000
    })

    // Remove user data only when authentication fails
    useEffect(() => {
        if (isError) {
             console.warn("Authentication failed: Removing user data.")
            localStorage.removeItem("user") // Remove user data
        }
    }, [isError])

    // Handle unauthorized users
    if (!accessToken || isError) {
        console.log("User not authenticated:", error?.message || "Redirecting...")
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />
};

export default RequireAuth

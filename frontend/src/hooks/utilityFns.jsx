import axios from "axios"

// Return User Token From Local Storage
const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return user?.accessToken || null
}

// Return API URL From .env File
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// Function to refresh access token
const refreshToken = async () => {
    try{
        const response = await api.post("/refresh")
        const { accessToken } = response.data
        localStorage.setItem("user", JSON.stringify({ accessToken }))
        return accessToken
    } catch (error){
        console.error("Refresh access token failed", error)
        return null
    }
}

// Intercept Expired Tokens and Refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            console.log("About to refresh access token")
            originalRequest._retry = true
            const newAccessToken = await refreshToken()

            if (newAccessToken) {
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
                return api(originalRequest)
            }
        }

        return Promise.reject(error)
    }
)


export { getAccessToken, api, refreshToken }

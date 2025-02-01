import axios from "axios"

// Return User Token From Local Storage
const getToken = () => JSON.parse(localStorage.getItem("user"))?.token

// Return API URL From .env File
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// An interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage
            //localStorage.removeItem("user")
            // Redirect to the home page
            //window.location.href = "/"
        }
    }
)

export { getToken, api }

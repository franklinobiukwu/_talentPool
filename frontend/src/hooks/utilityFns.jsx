// Return User Token From Local Storage
const getToken = () => JSON.parse(localStorage.getItem("user"))?.token

// Return API URL From .env File
const getApiUrl = () => import.meta.env.VITE_API_URL

export { getToken, getApiUrl }

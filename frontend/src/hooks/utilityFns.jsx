const getToken = () => JSON.parse(localStorage.getItem("user"))?.token

export { getToken}

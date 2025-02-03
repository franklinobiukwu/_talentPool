import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import SubmitButton from "./SubmitButton"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../hooks/utilityFns.jsx";


const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/


const loginFn = async(data) => {
    const result = await api.post(`/login`, data)
    return result.data
}

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Error States
    const [validEmail, setValidEmail] = useState(false)

    // Navigation
    const navigate = useNavigate()

    // Validate Email
    useEffect( () => {
       setValidEmail(EMAIL_REGEX.test(email)) 
    }, [email])

    // Query Client Hook
    const queryClient = useQueryClient()

    const {mutate, isPending, isError, error } = useMutation({
        mutationFn: loginFn,
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data))
            // Cache Data Response
            queryClient.setQueryData(["user"], data)

            // Invalidate authentication-related queries to trigger a refetch
            //queryClient.invalidateQueries(["personal information"]);
            // Navigate immediately after updating state
            navigate("/dashboard")
        }
    })

    // Login Handler
    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        }
        mutate(data)
    }

    return (
        <div>
            <div className="flex items-center justify-center">

                <form autoComplete="off">
                    {/* Email */}
                    <div>
                        <label 
                            htmlFor="email"
                            className="block mb-2 text-blue-primary
                                        font-inter font-semibold text-sm">
                            <span className="text-red-600">* </span>Email
                        </label>
                        <input
                            type="email"
                            placeholder="johndoe@abc.com"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={
                                `focus:${validEmail?
                                        "outline-blue-trans2":"outline-red-300"} 
                                        md:min-w-56 px-2 py-1 rounded 
                                        text-blue-primary border border-blue-trans2`}
                        />
                    </div>
                    {/* Password */}
                    <div className="mt-5">
                        <label
                            htmlFor="password" 
                            className="block mb-2 text-blue-primary
                                        font-inter font-semibold text-sm">
                            <span className="text-red-600">* </span>Password
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                        focus:outline-blue-trans2 md:min-w-56 px-2
                                        py-1 rounded text-blue-primary border border-blue-trans2"
                        />
                    </div>
                    {/* Display Error */}
                    {isError&&<div className="mt-2 px-2 bg-red-50 border border-red-100 rounded text-red-400">{error?.response?.data?.error}</div>}
                    {/* Button */}
                    <div className="flex items-center justify-center mt-8">
                        <SubmitButton
                            text="Log in" 
                            style="solid"
                            isLoading={isPending}
                            onClick={() => handleLogin()}                            
                            disabled={!validEmail || !password}
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginForm


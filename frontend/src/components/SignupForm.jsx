import { useEffect, useState } from "react"
import SubmitButton from "./SubmitButton.jsx";
import axios from "axios";
import { useNavigate } from "react-router";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";


const apiUrl = import.meta.env.VITE_API_URL

const signupFn = async (data) => {
    const response = await axios.post(`${apiUrl}/signup`, data)
    return response.data
}

const SignupForm = () => {
    const [firstname, setFname] = useState('')
    const [lastname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Error States
    const [passwordMatchError, setPasswordMatchError] = useState(false)

    // Valid Field State
    const [isValidFirstName, setIsValidFirstName] = useState(false)
    const [isValidLastName, setIsValidLastName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;

    const navigate = useNavigate()

    // Validate First Name
    useEffect(() => {
        if (firstname){
            setIsValidFirstName(USER_REGEX.test(firstname))
        } else {
            setIsValidFirstName(false)
        }
    }, [firstname])
    // Validate Last Name
    useEffect(() => {
        if (lastname){
            setIsValidLastName(USER_REGEX.test(lastname))
        } else {
            setIsValidLastName(false)
        }
    }, [lastname])

    // Validate Email
    useEffect(() => {
        if (email){
            setIsValidEmail(EMAIL_REGEX.test(email))
        } else {
            setIsValidEmail(false)
        }
    }, [email])
    // Validate Password Strength
    useEffect(() => {
        if (password){
            setIsValidPassword(PWD_REGEX.test(password))
        } else {
            setIsValidPassword(false)
        }
    }, [password])
    // Validate Password Match
    useEffect(() => {
        if (password && confirmPassword){
            if (password !== confirmPassword){
                setPasswordMatchError(true)
            }
        }
    }, [password, confirmPassword])
    // Validate Gender

    // Set Error if Password don't match
    useEffect(() => {
        if (password && confirmPassword){
            if (password === confirmPassword){
                setPasswordMatchError(false)
            } else {
                setPasswordMatchError(true)
            }
        }
    },[password, confirmPassword])

    // Query Client
    const queryClient = useQueryClient()

    // mutate function
    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: signupFn,
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data))
            // Cache Data Response
            queryClient.setQueryData(["user"], data)
            navigate("/dashboard")
        }
    })
    // Form Submit Handler
    const handleSignup = () => {
        const data = {
            firstName: firstname, 
            lastName:lastname, 
            email, 
            gender, 
            password, 
            confirmPassword}
        mutate(data)
    }

    return (
        <div>
            <div>
                <form autoComplete="off">
                    {/*--------First Name and Last Name---------*/}
                    <div className="md:flex items-center justify-center gap-4 mb-4">
                        {/*First Name*/}
                        <div className="mb-4 md:mb-0">
                            <label
                                htmlFor="firstname"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="John"
                                value={firstname}
                                onChange={(e) => setFname(e.target.value)}
                                className={`border border-blue-trans2 focus:${isValidFirstName?'outline-blue-trans2' : 'outline-red-300'} min-w-48 px-2 py-1 rounded`}
                            />
                        </div>
                        {/* Last Name */}
                        <div>
                            <label
                                htmlFor="lastname"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Doe"
                                value={lastname}
                                onChange={(e) => setLname(e.target.value)}
                                className={`border border-blue-trans2 focus:${isValidLastName?'outline-blue-trans2' : 'outline-red-300'} min-w-48 px-2 py-1 rounded`}
                            />
                        </div>
                    </div>
                    {/*---------Email and Gender------------*/}
                    <div className="md:flex items-center justify-center gap-4 mb-4">
                        {/* Email */}
                        <div className="mb-4 md:mb-0">
                            <label
                                htmlFor="email"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="johndoe@abc.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={
                                    `border border-blue-trans2 
                                    focus:${isValidEmail?
                                            'outline-blue-trans2' : 'outline-red-300'} 
                                    min-w-48 px-2 py-1 rounded`}
                            />
                        </div>
                        {/* Gender */}
                        <div>
                            <label
                                htmlFor="gender"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Gender
                            </label>
                            <select
                                onChange={(e) => setGender(e.target.value)}
                                className="border border-blue-trans2 focus:outline-blue-trans2 min-w-48 px-2 py-1 rounded"
                            >
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                            </select>
                        </div>
                    </div>
                    {/*---------Password and Confirm Password------------*/}
                    <div className="md:flex items-center justify-center gap-4">
                        {/* Password */}
                        <div className="flex flex-col self-start mb-4 md:mb-0">
                            <label
                                htmlFor="password"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`border border-blue-trans2 focus:${isValidPassword?'outline-blue-trans2' : 'outline-red-300'} min-w-48 px-2 py-1 rounded`}
                            />
                            {(!isValidPassword && password) && <div className="text-red-500 text-sm">
                                * must contain uppercase<br/>
                                * must contain lowercase<br/>
                                * must contain number<br/>
                                * must contain special character<br/>
                                * must be atleast 8 digits long</div>}
                        </div>
                        {/* Confirm Password */}
                        <div className="flex flex-col self-start">
                            <label
                                htmlFor="cpassword"
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="cpassword"
                                id="cpassword"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={
                                    `border border-blue-trans2 focus:${passwordMatchError? 'outline-red-50' : 'outline-blue-trans2'}
                                    min-w-48 px-2 py-1 rounded`}
                            />
                            {passwordMatchError && <div className="text-red-500 text-sm">Password doesn't match</div>}
                        </div>
                    </div>
                    {/* Display Signup Error */}
                    {isError&&<div className="mt-2 px-2 bg-red-50 border border-red-100 rounded text-red-400">{error?.response?.data?.error}</div>}

                    {/*-----------Button-------------*/}
                    <div className="flex justify-center items-center mt-10">
                        <SubmitButton
                            style="default"
                            text="Signup" 
                            onClick={handleSignup}
                            disabled={!isValidPassword || !isValidEmail || passwordMatchError || !firstname || !lastname || !email || !gender || !password || !confirmPassword}
                            isLoading={isPending}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm

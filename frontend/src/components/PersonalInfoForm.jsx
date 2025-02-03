import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import FormSelector from "./FormSelector.jsx";
import Button from "./Button.jsx";
import { FaEdit } from "react-icons/fa"
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, getAccessToken } from "../hooks/utilityFns.jsx";
import { IoCloseCircleOutline, IoSave } from "react-icons/io5"



// Fetch Personal Profile
const fetchPersonalProfile = async() => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.get(`/user/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return response.data
}

// Update Personal Profile
const updatePersonalProfile = async (data) => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.patch(`/user/profile`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return response.data
}

// Function to capitalize words
const capitalizeWords = (str) => str.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');

const PersonalInfoForm = (props) => {
    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    // Error States
    const [loadError, setLoadError] = useState('')
    const [updateError, setUpdateError] = useState('')

    // State to track for change
    const [hasChanged, setHasChanged] = useState(false)

    // State to store previous form data
    const [previousProfileData, setPreviousProfileData] = useState()

    // State to track form edit mode
    const [isEdit, setIsEdit] = useState(false)


    // Get all countries and states 
    const countries = Country.getAllCountries();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // Form Data
    const formData = {firstName, lastName, email, phoneNumber, gender, country, state, city}

    // Effect to set States of selected country when country changes
    useEffect(() => {
        if (country) {
            // Only trigger if the country has a valid value
            const selectedCountry = countries.find((c) => c.name.toLowerCase() === country.toLowerCase());
            if (selectedCountry) {
                setStates(State.getStatesOfCountry(selectedCountry.isoCode))
            } else {
                setStates([])
            }
        }
    }, [country])

    // Effect to Set Cities of Selected State
    useEffect(() => {
        if (state && country){
            const selectedCountry = countries.find((c) => c.name.toLowerCase() === country.toLowerCase());
            const selectedState = State.getAllStates().find((s) => s.name.toLowerCase() === state.toLowerCase())
            if (selectedCountry && selectedState){
                setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode))
            } else {
                setCities([])
            }
        }
    }, [state, country])


    // Fetch User Profile
    const { data, isPending, isError, error, isSuccess } = useQuery({
        queryKey: ["personal information"],
        queryFn: fetchPersonalProfile
    })

    // Set Form Field State with value from fetch operation
    useEffect(() => {
        if (isSuccess && !isPending && data){
            if (data.firstName) {
                setFname(capitalizeWords(data.firstName))
                props.setFirstName(data.firstName)
            }
            if (data.lastName) {
                setLname(capitalizeWords(data.lastName))
                props.setLastName(data.lastName)
            }
            if (data.email) {
                setEmail(data.email.toLowerCase())
                props.setEmail(data.email.toLowerCase())
            }
            if (data.phoneNumber) setPhoneNumber(data.phoneNumber)
            if (data.gender) setGender(capitalizeWords(data.gender))
            if (data.city) setCity(capitalizeWords(data.city))
            if (data.country) setCountry(capitalizeWords(data.country))
            if (data.state) setState(capitalizeWords(data.state))
        }
    }, [isSuccess, isPending, data])

    // Function to update profile data
    const {mutate,
            isPending: isUpdatePending,
            isError: isUpdateIsError,
            error: isUpdateError} = useMutation({
        mutationFn: updatePersonalProfile,
        onSuccess: (returnedData) => {
            console.log({returnedData})
            if (firstName) props.setFirstName(firstName)
            if (lastName) props.setLastName(lastName)
            if (email) props.setEmail(email)
            setIsEdit(false)
        }
    })

    // Handle Edit
    const handleEdit = () => {
        // Store all previous form field values
        setPreviousProfileData(formData)
        setIsEdit(true)
    }
    // Bool to track if form data changed
    useEffect(() => {
        setHasChanged(JSON.stringify(previousProfileData) !== JSON.stringify(formData))
        
    }, [previousProfileData, formData])

    // Handle Save
    const handleSave = () => {
        mutate(formData)
    }

    // Set Error States
    useEffect(() => {
        if (isError){
            setLoadError(`Error: ${error?.response?.data?.error}`)
        }
    }, [isError])

    useEffect(() => {
        if (isUpdateIsError){
            setUpdateError(`Error ${isUpdateError?.response?.data?.error}`)
        }
    }, [isUpdateIsError])

    return (
        <div>
            <div className="rounded shadow-sm shadow-blue-trans2 px-5 py-5">
                <h3 className="text-blue-primary font-inter font-bold text-md mb-5">
                    Personal Information
                </h3>
                <form>
                    {/*--------------First and Last Names----------------*/}
                    {/* First Name */}
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-5">
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                First name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFname(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                Last name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Doe"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={lastName}
                                onChange={(e) => setLname(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>

                    {/*-------------------Email and Phone-------------------*/}
                    <div className="flex justify-between items-center mb-5">
                        {/* Email */}
                        <div className="mr-5">
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="johndoe@example.com"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                        {/* Phone Number */}
                        <div>
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                Phone number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+2348 056 681 680"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>

                    {/*--------------------Gender and Country---------------*/}
                    <div className="flex justify-between items-center mb-5 ">
                        {/* Gender */}
                        <div className="mr-5">
                            <label
                                className="font-medium text-md text-blue-primary block mb-1"
                            >
                                Gender
                            </label>
                            {(!isEdit && gender) ? (
                                <div
                                    className={`rounded px-2 py-0.5 w-52
                                        text-blue-primary`}
                                >{gender}</div>
                            ) : (
                                <select
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={`rounded border px-2 py-0.5 w-52
                                        text-blue-primary ${!isEdit && 'border-none bg-transparent appearance-none px-0'}`}
                                    disabled={!isEdit}
                                >
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                </select>
                            )}
                        </div>
                        {/* Country Selector */}
                        <div>
                            <FormSelector
                                options={countries}
                                label="Country"
                                name="country"
                                setValue={setCountry}
                                setStateValue={setState}
                                setCityValue={setCity}
                                value={country}
                                isEdit={isEdit}
                                className={
                                    `rounded border px-2 py-0.5 w-52 
                                    text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>

                    {/*------------State and City-----------*/}
                    <div className="flex justify-between items-center mb-10">
                        {/* State Selector */}
                        <div className="mr-5 col-span-6">
                            <FormSelector
                                options={states}
                                label="State"
                                name="state"
                                setValue={setState}
                                setCityValue={setCity}
                                value={state}
                                isEdit={isEdit}
                                //className="mr-5"
                                className={
                                    `mr-5 rounded border px-2 py-0.5 
                                    w-52 text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                        {/* City Selector */}
                        <div className="col-span-6">
                            <FormSelector
                                options={cities}
                                label="City"
                                name="city"
                                setValue={setCity}
                                value={city}
                                isEdit={isEdit}
                                className={
                                    `rounded border px-2 py-0.5 w-52 
                                    text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none px-0'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>
                    {/* Display Errors */}
                    {isError && <p className="text-red-400 mb-2">{loadError}</p>}
                    {isUpdateIsError && <p className="text-red-400 mb-2">{updateError}</p>}

                    {/*-----------Submit----------------*/}
                    <div className="flex items-center justify-center">
                        { isEdit ? (
                            <div className="flex">
                                <div className="mr-2">
                                    <Button
                                        text="Save" 
                                        icon={<IoSave/>} 
                                        style="dark"
                                        onClick={handleSave}
                                        disabled={isUpdatePending || !hasChanged}
                                        isLoading={isUpdatePending}
                                    />
                                </div>
                                <Button
                                    text="Cancel"
                                    icon={<IoCloseCircleOutline/>}
                                    style="light"
                                    onClick={() => {
                                        if(previousProfileData){
                                            setFname(previousProfileData.firstName || "");
                                            setLname(previousProfileData.lastName || "");
                                            setEmail(previousProfileData.email || "");
                                            setPhoneNumber(previousProfileData.phoneNumber || "");
                                            setGender(previousProfileData.gender || "");
                                            setCountry(previousProfileData.country || "");
                                            setState(previousProfileData.state || "");
                                            setCity(previousProfileData.city || "");
                                        }

                                        setUpdateError('')
                                        setIsEdit(false)
                                    }}
                                />
                            </div>
                        ) : (
                            <Button 
                                text="Edit" 
                                icon={<FaEdit/>} 
                                style="text"
                                onClick={handleEdit}
                            />
                        ) }

                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoForm;

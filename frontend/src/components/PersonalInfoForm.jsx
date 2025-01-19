import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import FormSelector from "./FormSelector.jsx";
import Button from "./Button.jsx";
import { FaEdit } from "react-icons/fa"
import { FaSave } from "react-icons/fa"

const PersonalInfoForm = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [isEdit, setIsEdit] = useState(false)


    // Get all countries and states 
    const countries = Country.getAllCountries();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    // Effect to set States of selected country when country changes
    useEffect(() => {
        if (country) {
            // Only trigger if the country has a valid value
            const selectedCountry = countries.find((c) => c.name === country);
            if (selectedCountry) {
                setStates(State.getStatesOfCountry(selectedCountry.isoCode))
            }
        } else return
    }, [country])

    // Effect to Set Cities of Selected State
    useEffect(() => {
        if (state){
            const selectedCountry = countries.find((c) => c.name === country);
            const selectedState = State.getAllStates().find((s) => s.name === state)
            setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode))
        }else return
    }, [state])


    console.log("All", country, state, city)

    // Handle Save
    const handleSave = () => {
        setIsEdit(false)
    }

    // Handle Edit
    const handleEdit = () => {
        setIsEdit(true)
    }



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
                                id="fname"
                                name="fname"
                                type="text"
                                placeholder="John"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent'}`}
                                disabled={!isEdit}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                Last name
                            </label>
                            <input
                                id="lname"
                                name="lname"
                                type="text"
                                placeholder="Doe"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent'}`}
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
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent'}`}
                                disabled={!isEdit}
                            />
                        </div>
                        {/* Phone Number */}
                        <div>
                            <label className="font-medium text-md text-blue-primary block mb-1">
                                Phone number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+2348 056 681 680"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent'}`}
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
                            <select
                                id="gender"
                                name="gender"
                                //className="rounded border px-2 py-0.5 w-52 text-blue-primary"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={`rounded border px-2 py-0.5 w-52 text-blue-primary ${!isEdit && 'border-none bg-transparent'}`}
                                disabled={!isEdit}
                            >
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                            </select>
                        </div>
                        {/* Country Selector */}
                        <div>
                            <FormSelector
                                options={countries}
                                label="Country"
                                name="country"
                                setValue={setCountry}
                                className={
                                    `rounded border px-2 py-0.5 w-52 
                                    text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>

                    {/*------------State and City-----------*/}
                    <div className="flex justify-between items-center mb-12">
                        {/* State Selector */}
                        <div className="mr-5 col-span-6">
                            <FormSelector
                                options={states}
                                label="State"
                                name="state"
                                setValue={setState}
                                //className="mr-5"
                                className={
                                    `mr-5 rounded border px-2 py-0.5 
                                    w-52 text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none'}`}
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
                                className={
                                    `rounded border px-2 py-0.5 w-52 
                                    text-blue-primary 
                                    ${!isEdit && 'border-none bg-transparent appearance-none'}`}
                                disabled={!isEdit}
                            />
                        </div>
                    </div>
                    {/*-----------Submit----------------*/}
                    <div className="flex items-center justify-center">
                        { isEdit ? (
                            <Button
                                text="Save" 
                                icon={<FaSave/>} 
                                style="dark"
                                onClick={handleSave}
                            />
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

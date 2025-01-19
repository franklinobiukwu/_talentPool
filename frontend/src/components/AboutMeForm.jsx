import { FaEdit } from "react-icons/fa"
import Button from "./Button"
import { useEffect, useState } from "react"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getToken } from "../hooks/utilityFns"
import { ThreeDots } from "react-loader-spinner"
import { IoCloseCircleOutline, IoSave } from "react-icons/io5"


const apiUrl = import.meta.env.VITE_API_URL
const token = getToken()


// Function that Fetches About Me
const fetchAbout = async () => {
    const response = await axios.get(`${apiUrl}/user/profile/about`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

// Function That Mutatates About Me
const updateAbout = async (data) => {
    const response = await axios.patch(`${apiUrl}/user/profile/about`, {about: data}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data 
}

// About Me Form
const AboutMeForm = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [aboutMe, setAboutMe] = useState("")
    const [prevAboutMe, setPrevAboutMe] = useState("")
    const [hasChanged, setHasChanged] = useState(false)

    // Fetch About Me
    const {data, isPending, isError, error, isSuccess} = useQuery({
        queryKey: ['aboutme'],
        queryFn: fetchAbout,
        staleTime: 1000 * 60 * 60
    })

    // Set About Me to fetched data initially
    useEffect(()  => {
        if (isSuccess && !aboutMe && data?.about) {
            setAboutMe(data.about)
        }
    }, [isSuccess, data, aboutMe])

    // Track Changes
    useEffect(() => {
        setHasChanged(prevAboutMe !== aboutMe)
    }, [prevAboutMe, aboutMe])

    // Update About Me
    const {
        mutate, 
        isPending:isUpdatePending, 
        isError:isUpdateIsError, 
        isSuccess:isUpdateSuccess, 
        error:isUpdateError } = useMutation({
        mutationFn: updateAbout,
        onSuccess: (updatedAbout) => {
            //setAboutMe(updatedAbout.about)
            setIsEdit(false)
        } 
    })

    // Handle Save
    const handleSave = () => {
        mutate(aboutMe)
    }

    // Handle Edit
    const handleEdit = () => {
        setPrevAboutMe(aboutMe)
        setIsEdit(true)
    }

    return (
        <div>
            <div className="shadow-sm shadow-blue-trans2 rounded pb-2">
                <form className="px-5 pt-5">
                    <div className="mb-2">
                        <label
                            className="text-blue-primary font-inter
                                        font-semibold text-md"
                            htmlFor="about"
                            >
                                About me
                        </label>
                    </div>
                    {
                        isPending?(
                            <div className="flex justify-center items-center my-5">
                                <ThreeDots
                                        visible={true}
                                        height={"25"}
                                        width={"25"}
                                        color="#032c4878"
                                        radius={"9"}
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                />
                            </div>
                                ) : (
                                    <textarea
                                    type="text" 
                                    placeholder="I'm a hardworking..."
                                    value={aboutMe}
                                    className={`font-robotoMono text-blue-primary
                                        placeholder:text-blue-trans2 w-full
                                        focus:outline-blue-trans resize-none
                                        border rounded px-2 py-1 ${
                                            !isEdit && 'border-none bg-transparent'}`}
                                    name="about"
                                    id="about"
                                    maxLength={500}
                                    rows="4"
                                    disabled={!isEdit}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                    ></textarea>
                                )
                    }
                    {/* Display Errors */}
                    {isError && <p className="text-red-500">Error loading data: {error.message}</p>}
                    {isUpdateIsError && <p className="text-red-500">Error updating data: {isUpdateError.message}</p>}

                    <div className="flex justify-center items-center my-5">
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
                                        setAboutMe(prevAboutMe)
                                        setIsEdit(false)}
                                    }
                                    disabled={isUpdatePending}
                                />
                            </div>
                        ) : (
                            !isPending && 
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
    )
}
export default AboutMeForm

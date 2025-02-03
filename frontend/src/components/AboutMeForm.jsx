import { FaEdit } from "react-icons/fa"
import Button from "./Button"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { api, getAccessToken } from "../hooks/utilityFns"
import { ThreeDots } from "react-loader-spinner"
import { IoCloseCircleOutline, IoSave } from "react-icons/io5"



// Function that Fetches About Me
const fetchAbout = async () => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.get(`/user/profile/about`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return response.data
}

// Function That Mutatates About Me
const updateAbout = async (data) => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No access token found")

    const response = await api.patch(`/user/profile/about`, {about: data}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
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
    const [isLoaded, setIsLoaded] = useState(false)

    // Error States
    const [loadError, setLoadError] = useState('')
    const [updateError, setUpdateError] = useState('')

    // Fetch About Me
    const {data, isPending, isError, error, isSuccess} = useQuery({
        queryKey: ['aboutme'],
        queryFn: fetchAbout,
        staleTime: 1000 * 60 * 60
    })

    // Set About Me to fetched data initially
    useEffect(()  => {
        if (isSuccess && !isLoaded && data?.about) {
            setAboutMe(data.about)
            setIsLoaded(true)
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

    useEffect(() => {
        if (isError){
            setLoadError(`Error: ${error?.response?.data?.error}`)
        }
    }, [isError])

    useEffect(() => {
        if (isUpdateIsError){
            setUpdateError(`Error: ${isUpdateError?.response?.data?.error}`)
        }
    }, [isUpdateError])

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
                    {isError && <p className="text-red-400">{loadError}</p>}
                    {isUpdateIsError && <p className="text-red-400">{updateError}</p>}

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
                                        setUpdateError('')
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

import { IoClose } from "react-icons/io5"
import SectionForm from "../components/SectionForm"
import ListSections from "../components/ListSections"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api, getAccessToken } from "../hooks/utilityFns.jsx";


// Create Section
const createSection = async (sectionName) => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.post("/user/cvsections", {sectionName}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    console.log({response})
    return response?.data
}


// Update Section
const updateSection = async ({sectionName, sectionId}) => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No accessToken found")

    const response = await api.patch(`/user/cvsections/${sectionId}`, {sectionName}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return response.data
}


const SettingsPage = () => {
    
    const [formIsOpen, setFormIsOpen] = useState(false)
    const [isEditSection, setIsEditSection] = useState(false)
    // Section Name and Id
    const [sectionName, setSectionName] = useState('')
    const [sectionId, setSectionId] = useState('')
    // Error State
    const [errorMessage, setErrorMessage] = useState('')

    // Get Query Client Instance
    const queryClient = useQueryClient()

 
    // Mutation Fxn to create sectionName
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createSection,
        onSuccess: (newData) => {
            console.log({newData})
            console.log({error})
            queryClient.setQueryData(["cvSections"], (oldData) => {
                if (!oldData) return [newData]
                return [...oldData, newData]
            })
//            setCancelTriggered(true)
            setSectionName('')
            setErrorMessage('')

        }
    })

    useEffect(() => {
        console.log({error})
        if (error) {
            setErrorMessage(error.message || "An error occurred")
        }
    }, [error])

    // Function to handle Section Name Creation
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage('')
        console.log({sectionName})
        mutate(sectionName)
    }

    // Mutation Fxn to update sectionName
    const {
        mutate:updateMutate,
        isPending:updateIsPending,
        isError:updateIsError,
        error:updateError} = useMutation({
            mutationFn: updateSection,
            onSuccess: (updatedSectionName) => {
                queryClient.setQueryData(["cvSections"], (oldData) => {
                    if (!oldData) return [updatedSectionName]
                    return [...oldData, updatedSectionName]
                })
            }
    })

    // Function to handle Update sectionName
    const handleUpdate = (e) => {
        e.preventDefault()
        updateMutate({sectionName, sectionId})
    }


    return (
        <div className="md:grid grid-cols-12 relative h-screen">
            {/* Sections List */}
            <div className="md:col-span-6">
                <ListSections
                    setFormIsOpen={setFormIsOpen}
                    setIsEditSection={setIsEditSection}
                    setSectionName={setSectionName}
                    setSectionId={setSectionId}
                />
            </div>
            {/* Section Form*/}
            <div 
                className={`absolute bg-[#032c481c] h-full left-0 w-full overflow-hidden ${!formIsOpen && "hidden"}`}
            >
                <div className="flex justify-end">
                    <button 
                        className="text-2xl text-red-400"
                        onClick={() => setFormIsOpen(false)}
                    >
                        <IoClose/>
                    </button>
                </div>
                <div className="flex justify-center items-center h-full">
                    <SectionForm
                        setFormIsOpen={setFormIsOpen}
                        isEditSection={isEditSection}
                        setIsEditSection={setIsEditSection}
                        sectionName={sectionName}
                        setSectionName={setSectionName}
                        sectionId={sectionId}
                        handleSubmit={handleSubmit}
                        isError={isError}
                        isPending={isPending}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                </div>
            </div>
        </div>
    )
}
export default SettingsPage

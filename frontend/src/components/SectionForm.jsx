import { useEffect, useState } from "react"
import Button from "./Button.jsx"
import { api, getToken } from "../hooks/utilityFns.jsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ErrorDisplay from "./ErrorDisplay.jsx";


const token = getToken()

// Create Section
const createSection = async (sectionName) => {
    const response = await api.post("/user/cvsections", {sectionName}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const SectionForm = (props) => {
    const [sectionName, setSectionName] = useState('')
    const [cancelTriggered, setCancelTriggered] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Get Query Client Instance
    const queryClient = useQueryClient()

    // Mutation Fxn to create sectionName
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createSection,
        onSuccess: (newData) => {
            queryClient.setQueryData(["cvSections"], (oldData) => {
                if (!oldData) return [newData]
                return [...oldData, newData]
            })
            setCancelTriggered(true)
            setSectionName('')
            setErrorMessage('')

        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(sectionName)
    }

    const handleCancel = () => {
        setCancelTriggered(true)
        setSectionName('')
        setErrorMessage('')
    }

    useEffect(() => {
        if (cancelTriggered && sectionName==="") {
            props.setFormIsOpen && props.setFormIsOpen(false)
            setCancelTriggered(false)
        }
    }, [sectionName, cancelTriggered])

    // Set Error Message State
    useEffect(() => {
        if (isError) {
            setErrorMessage(error?.message)
        }
    }, [isError])

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white-primary p-5 rounded shadow-md">
            <h3 className="mb-5 text-blue-primary font-bold text-md font-inter">Add Section</h3>
            <form> 
                <div className="mb-5">
                    <input
                        type="text"
                        name="sectionName"
                        placeholder="education"
                        onChange={(e) => setSectionName(e.target.value)}
                        className={`rounded border px-2 py-0.5 w-52 text-blue-primary `}
                        value={sectionName}
                    />
                </div>
                {/* Display Errors */}
                {(isError && errorMessage) && (
                    <div className="mb-2">
                        <ErrorDisplay
                            text={errorMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </div>
                )}
                {/* Buttons */}
                <div className="flex">
                    <div className="mr-2">
                        <Button
                            text="Submit"
                            style="dark"
                            onClick={handleSubmit}
                            disabled={isPending}
                            isLoading={isPending}
                        />
                    </div>
                    <Button
                        text="Cancel"
                        style="light"
                        onClick={handleCancel}
                        disabled={isPending}
                    />
                </div>
                
            </form>
        </div>
    ) 
}
export default SectionForm

import { useEffect, useState } from "react"
import Button from "./Button.jsx"
import ErrorDisplay from "./ErrorDisplay.jsx";



const SectionForm = (props) => {
    const [cancelTriggered, setCancelTriggered] = useState(false)

    const handleCancel = () => {
        setCancelTriggered(true)
        props.setSectionName('')
        props.setErrorMessage('')
    }

    const handleSubmit = (e) => {
        props.handleSubmit(e)
        handleCancel()
    }

    useEffect(() => {
        if (cancelTriggered && props.sectionName==="") {
            props.setFormIsOpen && props.setFormIsOpen(false)
            setCancelTriggered(false)
            props.setIsEditSection(false)
        }
    }, [props.sectionName, cancelTriggered])

    // Set Error Message State
    useEffect(() => {
        if (props.isError) {
            props.setErrorMessage(props.error?.message)
        }
    }, [props.isError])

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white-primary p-5 rounded shadow-md">
            <h3 className="mb-5 text-blue-primary font-bold text-md font-inter">
                {props.isEditSection ? "Edit Section" : "Add Section"}
            </h3>
            <form> 
                <div className="mb-5">
                    <input
                        type="text"
                        name="props.sectionName"
                        placeholder="education"
                        onChange={(e) => props.setSectionName(e.target.value)}
                        className={`rounded border px-2 py-0.5 w-52 text-blue-primary `}
                        value={props.sectionName}
                    />
                </div>
                {/* Display Errors */}
                {(props.isError && props.errorMessage) && (
                    <div className="mb-2">
                        <ErrorDisplay
                            text={props.errorMessage}
                            setErrorMessage={props.setErrorMessage}
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
                            disabled={props.isPending}
                            isLoading={props.isPending}
                        />
                    </div>
                    <Button
                        text="Cancel"
                        style="light"
                        onClick={handleCancel}
                        disabled={props.isPending}
                    />
                </div>
                
            </form>
        </div>
    ) 
}
export default SectionForm

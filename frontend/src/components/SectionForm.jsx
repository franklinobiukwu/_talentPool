import { useEffect, useState } from "react"
import Button from "./Button.jsx"

const SectionForm = (props) => {
    const [sectionName, setSectionName] = useState('')
    const [cancelTriggered, setCancelTriggered] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({sectionName})
    }

    const handleCancel = () => {
        setSectionName('')
        setCancelTriggered(true)
    }

    useEffect(() => {
        if (cancelTriggered && sectionName==="") {
            props.setFormIsOpen && props.setFormIsOpen(false)
            setCancelTriggered(false)
        }
    }, [sectionName, cancelTriggered])

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
                {/* Buttons */}
                <div className="flex">
                    <div className="mr-2">
                        <Button
                            text="Submit"
                            style="dark"
                            onClick={handleSubmit}
                        />
                    </div>
                    <Button
                        text="Cancel"
                        style="light"
                        onClick={handleCancel}
                    />
                </div>
                
            </form>
        </div>
    ) 
}
export default SectionForm

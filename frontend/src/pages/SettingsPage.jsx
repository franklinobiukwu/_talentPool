import { IoClose } from "react-icons/io5"
import ListCardHeading from "../components/ListCardHeading"
import SectionForm from "../components/SectionForm"
import { useState } from "react"

const SettingsPage = () => {
    
    const [formIsOpen, setFormIsOpen] = useState(false)

    return (
        <div className="md:grid grid-cols-12 relative h-screen">
            {/* Sections List */}
            <div className="md:col-span-6">
                <ListCardHeading
                    title="Sections"
                    setFormIsOpen={setFormIsOpen}
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
                    />
                </div>
            </div>
        </div>
    )
}
export default SettingsPage

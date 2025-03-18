import { IoClose } from "react-icons/io5"

const PopupModal = ({formIsOpen, setFormIsOpen, children, className, closeBtn}) => {

    return (
            <div 
                className={
                    `absolute bg-[#032c481c] h-full left-0 w-full top-0
                    overflow-hidden p-2 ${!formIsOpen && "hidden"} ${className}`
                }
            >
                <div className="flex justify-end">
                    <button 
                        className={`text-2xl text-red-500 ${closeBtn && "hidden"}`}
                        onClick={() => setFormIsOpen(false)}
                    >
                        <IoClose/>
                    </button>
                </div>
                <div className="flex justify-center items-center h-full">
                    {children}
                </div>
            </div>

    )
}

export default PopupModal

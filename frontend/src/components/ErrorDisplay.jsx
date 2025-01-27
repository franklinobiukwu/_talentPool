import { IoClose } from "react-icons/io5"

const ErrorDisplay = (props) => {
    return (
        <div className="border border-red-400 text-red-400 bg-red-100 rounded">
            {/* Close Icon */}
            {props.closeIcon && (
                <div className="flex justify-end">
                    <button
                        className="text-2xl text-red-400"
                        onClick={() => props.setErrorMessage('')}
                    >
                        <IoClose/>
                    </button>
                </div>
            )}
            {/* Error Text */}
            <div className="text-sm p-2">
                {props.text}
            </div>
        </div>
    )
}
export default ErrorDisplay

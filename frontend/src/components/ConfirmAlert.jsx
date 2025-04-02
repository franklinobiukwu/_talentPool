import { useState } from "react";
import Button from "./Button.jsx";
import PopupModal from "./PopupModal.jsx";
import SubmitButton from "./SubmitButton.jsx";

const ConfirmAlert = ({ text, onConfirm, onCancel, isPending }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = (event) => {
        event.stopPropagation()
        setIsOpen(false);
        if (onCancel) onCancel();
    };

    return (
        <PopupModal
            formIsOpen={isOpen} 
            className="fixed inset-0 flex items-center justify-center
                        bg-black/40 backdrop-blur-sm"
            closeBtn="false"
        >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                {/* Text Content */}
                <p className="text-lg font-semibold text-gray-900">{text}</p>

                {/* Confirmation Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <SubmitButton
                        text="Yes"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg border-none
                                    shadow-md hover:bg-red-700 transition-all text-sm"
                        onClick={onConfirm}
                        disabled={isPending}
                        isLoading={isPending}
                        style="solid"
                    />
                    <SubmitButton
                        text="Cancel"
                        style="solid"
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg border-none
                                    shadow-md hover:bg-gray-400 transition-all text-sm"
                        onClick={handleClose}
                        disabled={isPending}
                    />
                </div>
            </div>
        </PopupModal>
    );
};

export default ConfirmAlert;

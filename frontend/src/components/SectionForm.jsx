import { useEffect } from "react";
import Button from "./Button.jsx";
import ErrorDisplay from "./ErrorDisplay.jsx";

const SectionForm = ({
    isEditSection,
    sectionName,
    setSectionName,
    handleUpdate,
    handleSubmit,
    handleCancel,
    isPending,
    isError,
    updateIsError,
    error,
    errorMessage,
    setErrorMessage
}) => {
    // Set Error Message State
    useEffect(() => {
        if (isError) {
            setErrorMessage(error?.message);
        }
    }, [isError, error, setErrorMessage]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            {/* Title */}
            <h3 className="mb-4 text-blue-primary font-semibold text-lg">
                {isEditSection ? "Edit Section" : "Add Section"}
            </h3>

            {/* Form */}
            <form className="space-y-4">
                {/* Input Field */}
                <div>
                    <input
                        type="text"
                        name="sectionName"
                        placeholder="Enter section name (e.g., education)"
                        onChange={(e) => {
                            setErrorMessage('');
                            setSectionName(e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-secondary transition-all"
                        value={sectionName}
                    />
                </div>

                {/* Error Display */}
                {(isError || updateIsError) && errorMessage && (
                    <ErrorDisplay text={errorMessage} setErrorMessage={setErrorMessage} />
                )}

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        text="Submit"
                        style="dark"
                        onClick={isEditSection ? handleUpdate : handleSubmit}
                        disabled={!sectionName}
                        isLoading={isPending}
                    />
                    <Button
                        text="Cancel"
                        style="light"
                        onClick={handleCancel}
                        disabled={isPending}
                    />
                </div>
            </form>
        </div>
    );
};

export default SectionForm;


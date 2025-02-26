import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, getAccessToken } from "../hooks/utilityFns";
import { ThreeDots } from "react-loader-spinner";
import { IoCloseCircleOutline, IoSave } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";

// Function to Fetch About Me
const fetchAbout = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No accessToken found");

    const response = await api.get("/user/profile/about", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
};

// Function to Update About Me
const updateAbout = async (data) => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No access token found");

    const response = await api.patch("/user/profile/about", { about: data }, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
};

// About Me Form Component
const AboutMeForm = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [prevAboutMe, setPrevAboutMe] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    const initialLoad = useRef(false); // Prevent unnecessary re-renders

    // Error States
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch About Me
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["aboutme"],
        queryFn: fetchAbout,
        staleTime: 1000 * 60 * 60,
    });

    // Update About Me
    const { mutate, isPending: isUpdatePending, isError: isUpdateError, error: updateError } = useMutation({
        mutationFn: updateAbout,
        onSuccess: () => setIsEdit(false),
    });

    // Set initial About Me content
    useEffect(() => {
        if (data?.about && !initialLoad.current) {
            setAboutMe(data.about);
            setPrevAboutMe(data.about);
            initialLoad.current = true;
        }
    }, [data]);

    // Track Changes
    useEffect(() => {
        setHasChanged(prevAboutMe.trim() !== aboutMe.trim());
    }, [aboutMe, prevAboutMe]);

    // Handle Save
    const handleSave = () => {
        if (!aboutMe.trim()) return;
        mutate(aboutMe);
    };

    // Handle Edit
    const handleEdit = () => {
        setPrevAboutMe(aboutMe);
        setIsEdit(true);
    };

    // Handle Error Messages
    useEffect(() => {
        if (isError) setErrorMessage(`Error: ${error?.response?.data?.error}`);
        if (isUpdateError) setErrorMessage(`Error: ${updateError?.response?.data?.error}`);
    }, [isError, isUpdateError]);

    return (
        <div className="shadow-sm shadow-blue-trans2 rounded pb-2">
            <form className="px-5 pt-5">
                {/* Title */}
                <label htmlFor="about" className="text-blue-primary font-inter font-semibold text-md">
                    About Me
                </label>

                {/* Loading Indicator */}
                {isPending ? (
                    <div className="flex justify-center items-center my-5">
                        <ThreeDots visible={true} height={25} width={25} color="#032c4878" radius={9} ariaLabel="loading" />
                    </div>
                ) : (
                    <textarea
                        placeholder="I'm a hardworking..."
                        value={aboutMe}
                        className={`font-robotoMono text-blue-primary w-full placeholder:text-blue-trans2
                                    focus:outline-blue-trans resize-none border rounded px-2 py-1 ${
                                        !isEdit ? "border-none bg-transparent" : ""
                                    }`}
                        id="about"
                        maxLength={500}
                        rows="4"
                        disabled={!isEdit}
                        onChange={(e) => setAboutMe(e.target.value)}
                    />
                )}

                {/* Display Errors */}
                {errorMessage && <p className="text-red-400">{errorMessage}</p>}

                {/* Action Buttons */}
                <div className="flex justify-center items-center my-5">
                    {isEdit ? (
                        <div className="flex">
                            <Button
                                text="Save"
                                icon={<IoSave />}
                                style="dark"
                                onClick={handleSave}
                                disabled={isUpdatePending || !hasChanged}
                                isLoading={isUpdatePending}
                                className="mr-2"
                            />
                            <Button
                                text="Cancel"
                                icon={<IoCloseCircleOutline />}
                                style="light"
                                onClick={() => {
                                    setAboutMe(prevAboutMe);
                                    setErrorMessage("");
                                    setIsEdit(false);
                                }}
                                disabled={isUpdatePending}
                            />
                        </div>
                    ) : (
                        !isPending && <Button text="Edit" icon={<FaEdit />} style="text" onClick={handleEdit} />
                    )}
                </div>
            </form>
        </div>
    );
};

export default AboutMeForm;

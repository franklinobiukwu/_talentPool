import Avatar from "../assets/avatar.png"
import { MdModeEditOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, getAccessToken } from "../hooks/utilityFns.jsx";
import useCapitalizeWords from "../hooks/useCapitalizeWords.jsx";

const updateProfileImage = async (formData) => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No accessToken found");

    const response = await api.post(`/user/profile/photo`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

const InfoCard = (props) => {
    const queryClient = useQueryClient();
    const capitalizeWords = useCapitalizeWords();

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateProfileImage,
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']); // Ensure correct query key
        }
    });

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validate file type (only allow images)
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(selectedFile.type)) {
            alert("Only JPEG and PNG files are allowed.");
            return;
        }

        // Validate file size (e.g., max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (selectedFile.size > maxSize) {
            alert("File size should be less than 2MB.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        mutate(formData);
    };

    return (
        <div className="bg-gradient-to-br from-white-primary to-gray-50">
            <div className="flex items-center shadow-sm shadow-blue-trans2 px-5 py-2.5 rounded">
                <div className="relative w-24 mr-5">
                    <div className="w-full rounded-full overflow-hidden">
                        <img 
                            src={props.profileImage && !props.isLoading && !isLoading ? props.profileImage : Avatar}
                            alt="Profile"
                            className={`w-full h-full object-cover ${isLoading ? "opacity-50" : ""}`}
                        />
                        {isLoading && <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">Uploading...</div>}
                        <label
                            htmlFor="profileImg"
                            className="absolute right-[-0%] top-[70%] p-1 rounded-full text-blue-primary bg-white-primary shadow-md cursor-pointer bg-offWhite"
                        >
                            <MdModeEditOutline />
                        </label>
                    </div>
                    <input
                        type="file"
                        name="profileImg"
                        id="profileImg"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleUpload}
                    />
                </div>
                {/* User Details */}
                <div>
                    <h3 className="font-inter font-bold text-sm text-blue-primary">
                        {capitalizeWords(props.name)}
                    </h3>
                    <p className="font-roboto text-sm text-blue-primary">{props.email}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;

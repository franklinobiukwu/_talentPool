import Avatar from "../assets/avatar.png"
import { MdModeEditOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, getToken } from "../hooks/utilityFns.jsx";
import useCapitalizeWords from "../hooks/useCapitalizeWords.jsx";

const token = getToken()

const updateProfileImage = async (formData) => {
    const response = await api.post(`/user/profile/photo`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

const capitalizeWords = useCapitalizeWords()
const InfoCard = (props) => {

    const queryClient = useQueryClient()

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updateProfileImage,
        onSuccess: () => {
            queryClient.invalidateQueries('profilePhoto')
        }
    })

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        const formData = new FormData()
        formData.append("file", selectedFile)
        console.log({formData})
        mutate(formData)
    }

    return (
        <div className="bg-gradient-to-br from-white-primary to-gray-50">
            <div className="flex items-center shadow-sm shadow-blue-trans2 px-5 py-2.5 rounded">
                <div className="relative w-24 mr-5">
                    <div className="w-full rounded-full overflow-hidden mr-5">
                        <img 
                            src={ 
                                (props.profileImage && !props.isLoading && !isLoading) 
                                ? props.profileImage : Avatar 
                                }
                            alt="profile image"
                            className={isLoading ? "opacity-50" : ""}
                        />
                        {isLoading && <div className="absolute inset-0 bg-gray-200 opacity-50 flex items-center justify-center">Uploading...</div>}
                        <label
                            htmlFor="profileImg"
                            className="absolute right-[-0%] top-[70%] p-1
                                        rounded-full text-blue-primary
                                        bg-white-primary shadow-md cursor-pointer"
                        >
                            <MdModeEditOutline />
                        </label>
                    </div>
                    <input
                        type="file"
                        name="profileImg"
                        id="profileImg"
                        className="hidden"
                        onChange={handleUpload}
                    />
                </div>
                {/* Details */}
                <div>
                    <h3 className="font-inter font-bold text-sm text-blue-primary">{capitalizeWords( props.name)}</h3>
                    <p className="font-roboto text-sm text-blue-primary">{props.email}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoCard

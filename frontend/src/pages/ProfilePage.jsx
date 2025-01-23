import axios from "axios"
import AboutMeForm from "../components/AboutMeForm"
import InfoCard from "../components/InfoCard"
import ListCardHeading from "../components/ListCardHeading"
import PersonalInfoForm from "../components/PersonalInfoForm"
import useUser from "../hooks/useUser"
import { getApiUrl, getToken } from "../hooks/utilityFns"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


const apiUrl = getApiUrl()
const token = getToken()

// fetch profile image
const fetchProfileImg = async() => {
    const response = await axios.get(`${apiUrl}/user/profile/photo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const ProfilePage = () => {

    // Get User Primary Details
    const user = useUser()
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)

    // Fetch User Profile Picture
    const { data, isPending: isPendingImg, isError, error } = useQuery({
        queryKey: ["profilePhoto"],
        queryFn: fetchProfileImg
    })

    return (
        <div className="lg:grid grid-cols-12 gap-4 p-10">
            <div className="col-span-6">
                {/* User Name and Email*/}
                <div className="mb-4">
                    <InfoCard
                        name={`${firstName} ${lastName}`}
                        email={`${email}`}
                        profileImage={data?.photo}
                        isLoading={isPendingImg}
                    />
                </div>
                {/* About Me */}
                <div className="mb-8">
                    <AboutMeForm/>
                </div>
                {/* Education */}
                <div className="md:mb-8">
                    <ListCardHeading
                        title="Education"
                    />
                </div>
            </div>
            {/* Personal Info Form */}
            <div className="col-span-6">
                {/* Personal Info Form */}
                <div className="mb-8">
                    <PersonalInfoForm
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setEmail={setEmail}
                    />
                </div>
                {/* Skills */}
                <div>
                    <ListCardHeading
                        title="Skills"
                    />
                </div>
            </div>
        </div>
    )
}
export default ProfilePage

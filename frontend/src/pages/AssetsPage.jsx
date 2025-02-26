import { useQuery } from "@tanstack/react-query";
import AssetCard from "../components/AssetCard.jsx"
import AssetForm from "../components/AssetForm.jsx";
import { api, getAccessToken } from "../hooks/utilityFns.jsx";

const fetchAssets = async () => {

    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No access token found")

    const response = await api.get("/user/cvassets", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return response?.data
}

// Function to fetch Sections
const fetchSections = async () => {
    const accessToken = getAccessToken()
    if (!accessToken) throw new Error("No access token found")

    const response = await api.get("/user/cvsections", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return response?.data
}

const AssetsPage = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["cvassets"],
        queryFn: fetchAssets,
    })

    data && console.log(data)

    const {
        data:cvsections,
        isPending:sectionIsPending,
        isError:sectionIsError,
        error:sectionError} = useQuery({
        queryKey: ["cvsections"],
        queryFn: fetchSections,
    })
    
    cvsections && console.log({cvsections})


    return (
        <div className="p-5">
            {/* Assets Card List */}
            <div className="flex gap-4 flex-wrap justify-center">
                { data ? 
                    data?.map(asset => (
                        <AssetCard
                            key={asset._id}
                            assetSection={asset.section}
                            assetTags={asset.tags}
                        />
                    )) : 
                    <div>Loading...</div>}
            </div>
            {/* Asset Form */}
            <div>
                <AssetForm
                    sections={cvsections?cvsections : ""}
                />
            </div>
        </div>
    )
}

export default AssetsPage

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AssetCard from "../components/AssetCard.jsx"
import AssetForm from "../components/AssetForm.jsx";
import { api, getAccessToken } from "../hooks/utilityFns.jsx";
import PopupModal from "../components/PopupModal.jsx";
import ToolBar from "../components/ToolBar.jsx"
import SearchBar from "../components/SearchBar.jsx";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import AssetDisplay from "../components/AssetDisplay.jsx"


// Function to fetch assets
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

// Function to delete asset
const deleteAsset = async (_id) => {
    const accessToken = getAccessToken()

    if (!accessToken) throw new Error("No token found")

    const response = await api.delete(`/user/cvassets/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return response?.data
}

// Function to Edit Asset
const updateAsset = async (_id) => {
    const accessToken = getAccessToken()
    if (!accessToken) throw new Error("No token found")

    const response = await api.patch(`/user/cvassets/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    console.log({response})
    return response?.data
}


const AssetsPage = () => {

    const [formIsOpen, setFormIsOpen] = useState(false)
    const [displayAsset, setDisplayAsset] = useState(false)
    const [selectedAssetId, setSelectedAssetId] = useState(null)

    const [assetFormData, setAssetFormData] = useState({
        section: "", content: "", tags: ""
    })

    const queryClient = useQueryClient()

    // Fetch Assets
    const { data:assets, isPending, isError, error } = useQuery({
        queryKey: ["cvassets"],
        queryFn: fetchAssets,
    })

    // Fetch Sections
    const {
        data:cvSections,
        isPending:sectionIsPending,
        isError:sectionIsError,
        error:sectionError} = useQuery({
        queryKey: ["cvsections"],
        queryFn: fetchSections,
    })
    

    // Mutation to delete asset
    const deleteAssetMutation = useMutation({
        mutationFn: deleteAsset,
        onSuccess: (deletedAsset) => {
            queryClient.setQueryData(["cvassets"], (oldData) => (
                oldData?.filter((asset) => (
                    asset._id !== deletedAsset._id
                ))
            ))
            setDisplayAsset(false)
        }
    })

    // Mutation to Update Asset
    const updateAssetMutation = useMutation({
        mutationFn: updateAsset,
        onSuccess: (updatedAsset) => {
            queryClient.setQueryData(["cvassets"], (oldData) => ([...oldData, updatedAsset]))
        }
    })

   // Handle asset deletion 
    const handleDelete = (assetId) => {
        deleteAssetMutation.mutate(assetId)
    }

    // Handle asset display in modal
    const handleDisplayAsset = (_id) => {
        setSelectedAssetId(_id)
        setDisplayAsset(true)
    }

    return (
        <div className="p-5 relative h-full">
            <ToolBar
                style="mb-5 py-2"
                title="Assets"
                setFormIsOpen={setFormIsOpen}
            >
                <SearchBar/>
            </ToolBar>

            {/* Assets Card List */}
            <div className="flex gap-4 flex-wrap justify-center">
                { isPending ? (
                    <div className="text-center">
                        <p className="text-gray-500">Loading assets...</p>
                        <Skeleton count={5} height={100} />
                    </div>
                ) : isError ? (
                    <p className="text-red-500 text-center">Error: {error.message}</p>
                ) : (
                    assets?.map((asset) => (
                        <AssetCard
                            key={asset._id}
                            assetId={asset._id}
                            assetSection={asset.section}
                            assetTags={asset.tags}
                            deleteAssetMutation={deleteAssetMutation}
                            onClick={() => handleDisplayAsset(asset._id)}
                        />
                    ))
                )}
            </div>

            {/* Asset Form Modal */}
            <PopupModal
                formIsOpen={formIsOpen}
                setFormIsOpen={setFormIsOpen}
                className='z-10'
            >
                <AssetForm
                    sections={cvSections || []}
                    formIsOpen={formIsOpen}
                    setFormIsOpen={setFormIsOpen}
                    asset={assetFormData}
                />
            </PopupModal>

            {/* Asset Display Modal */}
            <PopupModal
                formIsOpen={displayAsset}
                setFormIsOpen={setDisplayAsset}
                closeBtn={"none"}
            >
                { selectedAssetId ?
                    <AssetDisplay
                        _id={selectedAssetId}
                        setDisplayAsset={setDisplayAsset}
                        deleteAssetMutation={deleteAssetMutation}
                        setFormIsOpen={setFormIsOpen}
                        setAssetFormData={setAssetFormData}
                    /> : 
                    <p>No asset selected.</p>
                }
            </PopupModal>
        </div>
    )
}

export default AssetsPage

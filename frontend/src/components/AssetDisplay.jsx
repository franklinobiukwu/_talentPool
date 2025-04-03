import { useQuery } from "@tanstack/react-query";
import BlockImg from "../assets/building-blocks-amico.svg";
import { api, getAccessToken } from "../hooks/utilityFns";
import { GoKebabHorizontal } from "react-icons/go";
import { IoPencil, IoTrash } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ThreeDots } from "react-loader-spinner";

const fetchAsset = async (_id) => {
    const accessToken = getAccessToken()
    const response = await api.get(`/user/cvassets/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response?.data;
};

const AssetDisplay = ({ 
                        _id, setDisplayAsset, deleteAssetMutation, setFormIsOpen,
                        setAssetFormData, formIsOpen 
                    }) => {
    const [showMenu, setShowMenu] = useState(false);
    const assetRef = useRef(null)
    const menuRef = useRef(null)
    const hamburgerRef = useRef(null)

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["assets", _id],
        queryFn: () => fetchAsset(_id),
    });

    // Close AssetDisplay when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (assetRef.current && !assetRef.current.contains(event.target) && !formIsOpen){
                setDisplayAsset(false)
                setShowMenu(false)
            }
            console.log({formIsOpen})
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Skip if event.target is button
                if (hamburgerRef.current.contains(event.target)) return

                setShowMenu(false)
            }
        }


        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setDisplayAsset, formIsOpen])


    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div 
            className="w-full max-w-xl bg-white rounded-xl shadow-lg
                        border border-gray-200 overflow-hidden
                        transition-all hover:shadow-xl"
            ref={assetRef}
        >
            {/* Image & Menu */}
            <div className="relative">
                <img src={BlockImg} alt="Asset" className="w-full h-52 object-cover" />
                
                {/* Menu Button */}
                <div className="absolute top-3 right-3" ref={hamburgerRef}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 bg-gray-100 hover:bg-gray-200
                                    rounded-full transition-all"
                        ref={menuRef}
                    >
                        <GoKebabHorizontal className="text-gray-600 text-lg" />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {showMenu && (
                    <div
                        ref={menuRef}
                        className="absolute top-12 right-3 bg-white shadow-md rounded-lg border w-32 py-2"
                    >
                        <button 
                            className="flex items-center gap-2 px-4 py-2
                                        text-gray-700 hover:bg-gray-100 w-full"
                            onClick={() => {
                                setAssetFormData(data)
                                setFormIsOpen(true)
                            }}
                        >
                            <IoPencil className="text-blue-500" />
                            Edit
                        </button>
                        <button 
                            className={`flex items-center gap-2 px-4 py-2 text-red-600 
                                        hover:bg-red-100 w-full
                                        ${deleteAssetMutation.isPending && 
                                                "bg-gray-300 hover:bg-gray-300 text-gray-600"}`}
                            onClick={(event) => {
                                event.stopPropagation()
                                deleteAssetMutation.mutate(data._id)
                            }}
                            disabled={deleteAssetMutation.isPending}
                        >
                            {deleteAssetMutation.isPending? 
                                <ThreeDots
                                    visible={true}
                                    color="#fafafa"
                                    height={"25"}
                                    width={"25"}
                                    redius={"110"}
                                    ariaLabel="three-dots"
                                /> : <IoTrash className="text-red-500" />}
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5">
                {/* Section Title */}
                {isPending ? (
                    <Skeleton count={1} height={30}/>
                    ) : (
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {data?.section}
                    </h2>
                )}

                {/* Content */}
                {isPending ? (
                    <Skeleton count={1} height={100} className="mt-5" />
                ) : (
                    <p className="text-gray-600 leading-relaxed">
                        {data?.content}
                    </p>
                )}

                {/* Tags */}
                {isPending ? (
                    <div className="flex gap-4 mt-5">
                        <Skeleton count={1} height={20} width={100} /> 
                        <Skeleton count={1} height={20} width={100} /> 
                        <Skeleton count={1} height={20} width={100} /> 
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {data?.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                            >
                               {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetDisplay;


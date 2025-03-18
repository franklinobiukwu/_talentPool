import BlockImg from "../assets/building-blocks-amico.svg";
import { LuToyBrick } from "react-icons/lu";
import useCapitalizeWords from "../hooks/useCapitalizeWords.jsx";
import { IoTrash } from "react-icons/io5";
import ConfirmAlert from "./ConfirmAlert.jsx";
import { useState } from "react";


const AssetCard = ({ assetTags, assetSection, assetId, deleteAssetMutation, onClick }) => {
    const capitalizeWords = useCapitalizeWords();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    return (
        <div
            className="relative shadow-md rounded-xl overflow-hidden
                        w-64 bg-white transition-all hover:shadow-2xl
                        hover:-translate-y-1 flex flex-col
                        justify-between border border-gray-200"
            onClick={() => onClick()}
        >
            
            {/* Image Section */}
            <div className="h-40 bg-gray-100 flex justify-center items-center">
                <img src={BlockImg} alt="asset-image" className="h-full object-cover"/>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {assetTags?.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Section Name & Delete Button */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LuToyBrick className="text-blue-600 text-lg"/>
                        <h3 className="font-semibold text-gray-800">{capitalizeWords(assetSection)}</h3>
                    </div>

                    <button 
                        className="text-gray-500 hover:text-red-500 transition duration-300 p-2 rounded-md hover:bg-gray-100"
                        onClick={handleDelete}
                    >
                        <IoTrash size={18} />
                    </button>
                </div>
            </div>

            {/* Confirmation Alert */}
            {showConfirm && (
                <ConfirmAlert 
                    text="Do you really want to delete this asset?" 
                    onConfirm={() => deleteAssetMutation.mutate(assetId)} 
                    onCancel={() => setShowConfirm(false)} 
                    isPending={deleteAssetMutation.isPending}
                />
            )}
        </div>
    );
};

export default AssetCard;


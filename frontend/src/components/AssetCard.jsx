import BlockImg from "../assets/building-blocks-amico.svg";
import { LuToyBrick } from "react-icons/lu";
import useCapitalizeWords from "../hooks/useCapitalizeWords.jsx";

const AssetCard = (props) => {
    const capitalizeWords = useCapitalizeWords()

    return (
        <div
            className="shadow-lg rounded-lg overflow-hidden 
                        w-64 bg-white transition-transform hover:scale-105 
                        hover:shadow-xl flex flex-col justify-between">
            {/* Image */}
            <div className="h-40 bg-gray-100 flex justify-center items-center">
                <img src={BlockImg} alt="asset-image" className="h-full object-cover"/>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {props.assetTags?.map((tag, index) => (
                        <span key={index} className="bg-blue-trans2 text-blue-primary text-xs font-semibold px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Section Name */}
                <div className="flex items-center">
                    <LuToyBrick className="text-blue-secondary text-lg mr-2"/>
                    <h3 className="font-semibold text-gray-700">{props.assetSection && capitalizeWords(props.assetSection)}</h3>
                </div>
            </div>
        </div>
    );
};

export default AssetCard;


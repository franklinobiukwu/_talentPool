import { IoTrash } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import Button from "./Button";
import useCapitalizeWords from "../hooks/useCapitalizeWords";
import { ThreeDots } from "react-loader-spinner";

const SimpleListCard = ({ title, isLoading, _id, deleteId, handleEdit, handleDelete }) => {
    const capitalizeWords = useCapitalizeWords();

    return (
        <div className="flex justify-between items-center bg-white shadow-sm rounded-lg py-3 px-5 border border-gray-200 transition-all hover:shadow-md">
            {/* Title */}
            <div className="text-gray-700 font-semibold text-sm">
                {capitalizeWords(title)}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
                {/* Edit Button */}
                <Button
                    style="text"
                    icon={<MdModeEdit className="text-blue-secondary hover:text-blue-700 transition-colors" />}
                    onClick={() => handleEdit({ title, _id })}
                />

                {/* Delete Button or Loader */}
                {isLoading && _id === deleteId ? (
                    <ThreeDots
                        visible={true}
                        height={25}
                        width={25}
                        color="#032c4878"
                        radius={9}
                        ariaLabel="three-dots-loading"
                    />
                ) : (
                    <Button
                        style="text"
                        icon={<IoTrash className="text-red-500 hover:text-red-700 transition-colors" />}
                        onClick={() => handleDelete(_id)}
                    />
                )}
            </div>
        </div>
    );
};

export default SimpleListCard;

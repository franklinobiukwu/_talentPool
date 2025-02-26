import { FaPlus } from "react-icons/fa";

const ListCardHeading = ({ title, setFormIsOpen }) => {
    return (
        <div className="rounded-md shadow-md bg-white p-3 border border-gray-200">
            <div className="flex justify-between items-center">
                {/* Title */}
                <h2 className="text-blue-primary font-roboto font-bold text-lg">
                    {title}
                </h2>

                {/* Plus Button */}
                <button
                    onClick={() => setFormIsOpen && setFormIsOpen(true)}
                    className="p-2 rounded-full bg-blue-trans2 hover:bg-blue-secondary transition-all"
                >
                    <FaPlus className="text-blue-primary" />
                </button>
            </div>
        </div>
    );
};

export default ListCardHeading;

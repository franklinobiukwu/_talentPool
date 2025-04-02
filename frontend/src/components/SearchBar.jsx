import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder }) => {
    return (
        <div className="w-full max-w-md">
            <form 
                className="flex items-center rounded-full overflow-hidden 
                           bg-[#032c482e] px-4 py-2"
            >
                <input 
                    type="search" 
                    name="search"
                    placeholder={placeholder} 
                    className="flex-1 bg-transparent text-blue-trans 
                               focus:outline-none text-lg placeholder-gray-500"
                />
                <button 
                    type="submit" 
                    className="p-2 rounded-full bg-[#032c482e] hover:bg-[#032c4870] transition-all"
                    aria-label="Search"
                >
                    <FaSearch className="text-blue-primary text-xl"/>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;

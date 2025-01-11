import SearchBar from "./SearchBar.jsx";

const HeroText = () => {
    return (
        <div>
            <div className="flex flex-col pl-32">
                {/* Text */}
                <div
                    className="uppercase text-blue-primary font-inter
                                font-extrabold text-5xl mb-6 max-w-xl md:mt-24"
                >
                    <h1>discover the perfect talent match for your business needs</h1>
                </div>            
                {/* Search Bar */}
                <SearchBar placeholder="accountant"/>
                <p className="text-blue-trans font-robotoMono text-xs mt-2">Search qualified talents</p>
            </div>
        </div>
    )
}

export default HeroText

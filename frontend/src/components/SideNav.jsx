import { IoChatbubblesSharp, IoExtensionPuzzle, IoPerson, IoCogSharp, IoDocumentText } from "react-icons/io5";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router"; // Updated to react-router-dom

const SideNavBtn = ({ text, icon, link }) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    return (
        <Link to={link} className="block">
            <div
                className={`flex items-center px-8 py-2 font-inter font-medium transition-all duration-200 
                            rounded-r-full ${
                                isActive
                                    ? "bg-blue-primary text-white shadow-md"
                                    : "text-blue-primary hover:bg-blue-trans2 hover:text-blue-secondary"
                            }`}
            >
                <div className="mr-3 text-xl">{icon}</div>
                <span>{text}</span>
            </div>
        </Link>
    );
};

const SideNav = () => {
    return (
        <aside className="h-screen w-60 bg-blue-trans2 md:pt-6 shadow-md">
            {/* Logo */}
            <Link to="/" className="flex items-center px-8 pb-10">
                <img src={Logo} alt="logo" className="w-12 mr-3" />
                <p className="text-xl font-extrabold font-inter text-blue-primary">TalentPool</p>
            </Link>

            {/* Navigation */}
            <nav className="space-y-2">
                <SideNavBtn text="Feed" icon={<IoChatbubblesSharp />} link="/dashboard" />
                <SideNavBtn text="CVs" icon={<IoDocumentText />} link="/dashboard/cvs" />
                <SideNavBtn text="Assets" icon={<IoExtensionPuzzle />} link="/dashboard/assets" />
                <SideNavBtn text="Profile" icon={<IoPerson />} link="/dashboard/profile" />
                <SideNavBtn text="Settings" icon={<IoCogSharp />} link="/dashboard/settings" />
            </nav>
        </aside>
    );
};

export default SideNav;


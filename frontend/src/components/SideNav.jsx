import { IoChatbubblesSharp, IoExtensionPuzzle, IoPerson, IoCogSharp } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import Logo from "../assets/logo.png"
import { Link } from "react-router";


const SideNavBtn = (props) => {
    return (
        <Link to={props.link}>
            <div
                className="flex text-white-primary
                            items-center py-1 font-inter font-bold px-8">
                <div className="mr-2">
                    {props.icon} 
                </div>
                <div>
                    {props.text}
                </div>
            </div>
        </Link>
    )
}


const SideNav = () => {
    return (
        <div className="h-screen bg-blue-primary md:pt-5">
            {/*---------Logo--------*/}
            <Link to="/" className="flex items-center md:pb-16 px-8">
                <div className="w-14 overflow-hidden mr-2">
                    <img src={Logo} alt="logo"/>
                </div>
                <p
                    className="font-extrabold font-inter
                                text-white-primary text-xl"
                >
                    TalentPool
                </p>
            </Link>
            {/*----------Navigation------------*/}
            <div>
               <SideNavBtn text="Feed" icon={<IoChatbubblesSharp/>} link="/dashboard"/> 
               <SideNavBtn text="Cvs" icon={<IoDocumentText/>} link="/dashboard/cvs"/>
                <SideNavBtn text="Assets" icon={<IoExtensionPuzzle/>} link="/dashboard/assets"/> 
               <SideNavBtn text="Profile" icon={<IoPerson/>} link="/dashboard/profile"/> 
               <SideNavBtn text="Settings" icon={<IoCogSharp/>} link="/dashboard/settings"/> 
            </div>
        </div>
    )
}

export default SideNav


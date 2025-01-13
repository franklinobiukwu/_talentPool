import { Link } from "react-router"
import AuthBtn from "./AuthBtns"
import Logo from "../assets/logo.png"
import { HiOutlinePresentationChartBar } from "react-icons/hi";

const Navbar = (props) => {
    const handleLogout = () => {
        // Clear Local Storage
        localStorage.removeItem("user")
        // Refresh
        window.location.reload()
    }

    return (
        <div>
            <div className="flex w-full justify-between py-5 px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <div className="w-14 overflow-hidden">
                        <img src={Logo} alt="TalentPool Logo"/>
                    </div>
                    <p className="font-extrabold font-inter text-blue-primary text-xl">
                        TalentPool
                    </p>
                </Link>
                {/* Login and Signup Buttons*/}
                {!props.user ? ( 
                    <div className="flex items-center">
                        <div className="mr-4">
                           <AuthBtn text="Login" style="light" path="/login"/>
                        </div>
                        <div>
                            <AuthBtn text="Sign up" style="dark" path="/signup"/>
                        </div>
                    </div>) 
                            : 
                    (<div className="flex">
                        <div className="mr-4">
                            <AuthBtn
                                text="Dashboard"
                                style="light"
                                path="/dashboard"
                                icon={<HiOutlinePresentationChartBar />}
                            />
                        </div>
                        <div>
                            <AuthBtn text="Logout" style="dark" onClick={handleLogout}/>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Navbar

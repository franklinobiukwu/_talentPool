import LoginForm from "../components/LoginForm.jsx"
import LoginImg from '../assets/Resume-rafiki.svg'

const LoginPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex md:w-[60%] shadow-sm rounded border border-gray-100">
                {/* Side Image*/}
                <div className="w-1/2 hidden overflow-hidden md:block">
                    <img src={LoginImg} alt="Login Illustration" className="w-full h-auto"/>
                </div>
                {/* Login Form */}
                <div 
                className="bg-white-primary md:w-1/2 
                             px-5 py-10 flex justify-center items-center"
                >
                   <LoginForm/>
                </div>
            </div>
        </div>
    )
}
export default LoginPage


import SignupForm from "../components/SignupForm.jsx"
import SignupImg from "../assets/Creativity-bro.svg"

const SignupPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex xl:w-[60%] shadow-sm rounded border border-gray-100">
                {/* Side Image*/}
                <div className="w-1/2 hidden overflow-hidden xl:block">
                    <img src={SignupImg} alt="Login Illustration" className="w-full h-auto"/>
                </div>
                {/* Login Form */}
                <div 
                className="bg-white-primary xl:w-1/2 
                             px-5 py-10 flex justify-center items-center"
                >
                   <SignupForm/>
                </div>
            </div>
        </div>
    )
}
export default SignupPage

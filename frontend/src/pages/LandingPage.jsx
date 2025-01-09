import HeroImg from "../assets/Freelancer-bro.svg"
import HeroText from "../components/HeroText.jsx"

const LandingPage = () => {

    return (
        <div>
            <div className="h-screen bg-center bg-cover mt-[-50px] -z-10">
                <div className="flex items-center justify-center w-full">
                    <div className="w-1/2">
                        <img src={HeroImg}/>
                    </div>
                    <div className="w-1/2">
                        <HeroText/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage

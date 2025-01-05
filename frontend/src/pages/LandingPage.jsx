import HeroImg from "../assets/Freelancer-bro.svg"
import HeroText from "../components/HeroText.jsx"

const LandingPage = () => {

    return (
        <div>
            <div className="h-screen bg-center bg-cover">
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <img src={HeroImg}/>
                    </div>
                    <div className="col-span-6">
                        <HeroText/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage

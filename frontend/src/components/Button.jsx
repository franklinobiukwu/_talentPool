import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router";

const Button = (props) => {
    const light = `px-4 py-1.5 border border-blue-primary 
                            rounded text-blue-primary font-bold
                            font-inter flex items-center text-sm`;

    const dark = `px-4 py-1.5 bg-blue-primary text-white-primary
                        rounded border border-blue-primary font-bold
                        font-inter flex items-center text-sm ${
                            (props.disabled || props.isLoading) && 'bg-blue-trans border-none'}`;
    const text = `flex text-blue-primary font-bold font-inter text-sm items-center`

    return (
        <button
            type="button"
            onClick={props.onClick&&props.onClick}
            disabled={props.disabled || props.isLoading}
        >
        {/*        <Link to={props.path}>*/}
            <div className={props.style && (props.style == 'light' ? light : props.style == 'dark' ? dark : text)}>
                {props.icon &&

                    <div className="mr-2">
                        {
                            props.isLoading? (
                                <ThreeDots
                                    visible={true}
                                    color="#fafafa"
                                    height={"25"}
                                    width={"25"}
                                    radius={"110"}
                                    ariaLabel="three-dots"
                                />
                                ) : (
                                    props.icon
                                )
                        }
                    </div>
                }
                <div>
                    {props.text}
                </div>
            </div>
        {/*</Link>*/}
        </button>
    )
}

export default Button

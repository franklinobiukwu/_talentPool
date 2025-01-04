import { Link } from "react-router";

const AuthBtn = (props) => {
    const light = `px-4 py-1.5 border border-blue-primary 
                            rounded text-blue-primary font-bold
                            font-inter flex items-center text-sm`;

    const dark = `px-4 py-1.5 bg-blue-primary text-white-primary
                        rounded border border-blue-primary font-bold font-inter flex items-center text-sm`;

    return (
        <button
            onClick={props.onClick&&props.onClick}
            disabled={props.disabled&&props.disabled}
        >
        <Link to={props.path}>
            <div className={props.style && (props.style == 'light' ? light : dark)}>
                {props.icon &&

                    <div className="mr-2">
                        {props.icon}
                    </div>
                }
                <div>
                    {props.text}
                </div>
            </div>
        </Link>
        </button>
    )
}

export default AuthBtn

import { Puff } from "react-loader-spinner";

const SubmitButton = (props) => {
    
    const transparent = `px-4 py-1.5 border border-blue-primary 
                            rounded text-blue-primary
                            font-inter flex items-center ${props.className} 
                            ${props.disabled && "bg-gray-300 border-none text-gray-600"}`;

    const solid = `px-4 py-1 bg-blue-primary text-offWhite
                        rounded border border-blue-primary
                        font-inter flex items-center font-semibold ${props.className}
                    ${(props.disabled || props.isLoading)&&'bg-blue-trans border-none'}`;
    return (
        <button
            type="button"
            onClick={props.onClick}
            disabled={props.disabled || props.isLoading}
            className={props.style && (props.style == 'transparent' ? transparent : solid)}
        >
        {props.icon && !props.isLoading && <span className="mr-2">{props.icon}</span>}
        {props.isLoading? 
            (<Puff
                visible={true}
                color="#fafafa"
                height="25"
                width="40"
                radius={"110"}
                ariaLabel="rings-loading"
                />):
            (props.text)
        }
        </button>
    )
}
export default SubmitButton

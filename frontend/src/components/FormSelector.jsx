const FormSelector = (props) => {

    return (
        <div>
            <label
                htmlFor={props.name}
                className="font-medium text-md text-blue-primary block mb-1"
            >{props.label}</label>
            {(!props.isEdit && props.value) ? (
                <div 
                    className="rounded px-2 py-0.5 w-52 text-blue-primary"
                >
                    {props.value}
                </div>
            ) : (
                <select 
                name={props.name} 
                id={props.name} 
                onChange={(e)=>{
                    props.setValue(e.target.value)
                    props.setStateValue && props.setStateValue('')
                    props.setCityValue && props.setCityValue('')
                }}
                className={`rounded border px-2 py-0.5 w-52 ${props.className && props.className}`}
                disabled={props.disabled}
                >
                <option value="" disabled selected>
                    {props.value ? (props.value) : (
                        `Select ${props.label}`
                    )}
                </option>
                {
                    props.options.map(
                        (option) => (
                            <option
                            key={option.isoCode}
                            value={option.name}
                            >
                            {option.name}
                            </option>
                        ))
                }
                </select>
            )}
        </div>
    )
}
export default FormSelector

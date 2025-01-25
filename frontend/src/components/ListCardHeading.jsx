import { FaPlus } from "react-icons/fa"

const ListCardHeading = (props) => {
    return (
        <div className="rounded shadow-sm shadow-blue-trans2">
            <div className="flex justify-between items-center px-5 py-2.5">
                <h2
                    className="text-blue-primary font-roboto font-bold"
                >{props.title}</h2>
                <button
                    onClick={() => props.setFormIsOpen && props.setFormIsOpen(true)}
                >
                    <FaPlus className="text-blue-primary"/>
                </button>
            </div>
        </div>
    )
}
export default ListCardHeading

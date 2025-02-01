import { IoTrash } from "react-icons/io5"
import { MdModeEdit } from "react-icons/md"
import Button from "./Button"
import useCapitalizeWords from "../hooks/useCapitalizeWords"
import { ThreeDots } from "react-loader-spinner"

const SimpleListCard = (props) => {
    const capitalizeWords = useCapitalizeWords()
    return (
        <div className="flex justify-between shadow-sm rounded py-2 px-5 border border-white-primary">
            {/* Title */}
            <div className="text-blue-primary font-medium">
                {capitalizeWords(props.title)}
            </div>
            {/* Buttons */}
            <div className="flex justify-center items-center">
                <Button
                    style="text"
                    mr={"mr-2"}
                    icon={<MdModeEdit/>}
                    onClick={() => props.handleEdit(props)}
                />
                {(props.isLoading && props._id === props.deleteId) ? (
                    <ThreeDots
                        visible={true}
                        height={"25"}
                        width={"25"}
                        color="#032c4878"
                        radius={"9"}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />

                ) :(
                    <Button
                        style="text"
                        icon={<IoTrash className="text-red-400"/>}
                        onClick={() => props.handleDelete(props._id)}
                    />
                )}
            </div>
        </div>
    )
}
export default SimpleListCard

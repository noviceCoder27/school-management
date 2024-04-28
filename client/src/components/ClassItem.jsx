import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { convertToMonth } from "../utils/convertMonth";


const ClassItem = ({item,removeClass}) => {
  return (
    <tr>
        <td className="px-4 py-2 border">
            <p className = "hover:font-semibold">
                <Link to = {`/classes/${item._id}`}>{item.className}</Link>
            </p>
        </td>
        <td className="px-4 py-2 border">{item.year}</td>
        <td className="px-4 py-2 border">{convertToMonth(item.month)}</td>
        <td className="px-4 py-2 border">₹{item.studentFees}</td>
        <td className = "px-4 border">
            <div className="cursor-pointer hover:text-red-400 w-fit" onClick = {() => removeClass(item._id)}>
                <FaTrash />
            </div>
        </td>
    </tr>
  )
}

export default ClassItem

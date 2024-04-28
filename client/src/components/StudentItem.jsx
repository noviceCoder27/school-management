import { FaTrash } from "react-icons/fa";



const StudentItem = ({item,removeStudent}) => {
  return (
    <tr>
        <td className="px-4 py-2 border">{item.name}</td>
        <td className="px-4 py-2 border">{item.gender}</td>
        <td className="px-4 py-2 border">{item.className}</td>
        <td className="px-4 py-2 border">₹{item.fees}</td>
        <td className="px-4 py-2 border">{item.contactDetails}</td>
        <td className="px-4 py-2 border">{item.dateOfBirth}</td>
        <td className = "px-4 border">
            <div className="cursor-pointer hover:text-red-400 w-fit" onClick = {() => removeStudent(item._id)}>
                <FaTrash />
            </div>
        </td>
    </tr>
  )
}

export default StudentItem

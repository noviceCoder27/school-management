import { FaTrash } from "react-icons/fa";




const TeacherItem = ({item,removeTeacher}) => {
  return (
    <tr>
        <td className="px-4 py-2 border">{item.name}</td>
        <td className="px-4 py-2 border">{item.gender}</td>
        <td className="px-4 py-2 border">{item.className}</td>
        <td className="px-4 py-2 border">₹{item.salary}</td>
        <td className="px-4 py-2 border">{item.contactDetails}</td>
        <td className="px-4 py-2 border">{item.dateOfBirth}</td>
        <td className = "px-4 border">
            <div className="cursor-pointer hover:text-red-400 w-fit" onClick = {() => removeTeacher(item._id)}>
                <FaTrash />
            </div>
        </td>
    </tr>
  )
}

export default TeacherItem

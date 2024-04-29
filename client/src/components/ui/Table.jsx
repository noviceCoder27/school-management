import { deleteClass } from "../../apis/classes";
import { useDataContext } from "../../context/DataContext";
import { deleteStudent } from "../../apis/students";
import { deleteTeacher } from "../../apis/teachers";
import TeacherItem from "../TeacherItem";
import StudentItem from "../StudentItem";
import ClassItem from "../ClassItem";
import { toastError } from "../../utils/toastMessage";

const Table = ({data,student,isClass,setOpenPopup}) => {
    const {classes,setClasses,students,setStudents,teachers,setTeachers,setToUpdate} = useDataContext();
    const removeClass = async(id) => {
        try {
            const res = await deleteClass(id);
            const updatedClasses = classes.filter(classObj => classObj._id !== res._id);
            setClasses(updatedClasses);
            setToUpdate(prev => !prev);
        } catch(err) {
            toastError("Error deleting class");
        }
    }
    const removeStudent = async(id) => {
        try {
            const res = await deleteStudent(id);
            const updatedStudents = students.filter(studentObj => studentObj._id !== res._id);
            setStudents(updatedStudents);
            setToUpdate(prev => !prev);
        } catch(err) {
            toastError("Error deleting student")
        }
    }
    const removeTeacher = async(id) => {
        try {
            const res = await deleteTeacher(id);
            const updatedTeachers = teachers.filter(teacherObj => teacherObj._id !== res._id);
            setTeachers(updatedTeachers);
            setToUpdate(prev => !prev);
        } catch(err) {
            toastError("Error deleting teacher")
        }
    }
    
    
    const displayClassData = isClass && data?.map((item,index) => (
        <ClassItem key = {index} item = {item} removeClass = {removeClass} setOpenPopup = {setOpenPopup}/>
    ))
    const displayStudentData = student &&data?.map((item,index) => (
        <StudentItem key = {index} item = {item} removeStudent = {removeStudent} setOpenPopup = {setOpenPopup}/>
    ))
    const displayTeacherData = !student && data?.map((item,index) => (
       <TeacherItem key = {index} item = {item} removeTeacher = {removeTeacher} setOpenPopup = {setOpenPopup}/> 
    ));

    
    return (
        <table className="w-full mt-5 table-auto">
            <thead className = "text-white bg-indigo-400">
                {isClass ? 
                <tr>
                    <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2">Month</th>
                        <th className="px-4 py-2">Student Fees</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                : <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Class</th>
                    <th className="px-4 py-2">{student ? "Fees": "Salary"}</th>
                    <th className="px-4 py-2">Contact Details</th>
                    <th className="px-4 py-2">Date of Birth</th>
                    <th className="px-4 py-2"></th>
                </tr>}
            </thead>
            <tbody>
                {isClass ? 
                <>
                    {displayClassData}
                </>
                :<>
                    {student ? displayStudentData: displayTeacherData}
                </>}
            </tbody>
        </table>
    )
}

export default Table

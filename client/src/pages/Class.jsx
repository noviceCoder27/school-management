import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Card from "../components/ui/Card"
import { getClassDetails } from "../apis/classes";
import { useParams } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { FaCalendarAlt  } from "react-icons/fa";
import { convertToMonth } from "../utils/convertMonth";
import { getTeacherDetails } from "../apis/teachers";
import { getStudentDetails } from "../apis/students";
import PieGraph from "../components/PieGraph";
import { toastError } from "../utils/toastMessage";

const Class = () => {
    const [classDetails,setClassDetails] = useState(null);
    const [classStudents,setClassStudents] = useState([]);
    const [counts,setCounts] = useState({male: 0, female: 0});
    const [classTeachers,setClassTeachers] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const fetchDetails = async() => {
            try {
                const res = await getClassDetails(id);
                setClassDetails(res);
                const {students, teachers} = res;
                let tempStudents = [];
                let tempTeachers = [];
                for (const studentId of students) {
                    const studentRes = await getStudentDetails(studentId);
                    tempStudents.push(studentRes);
                }
                for (const teacherId of teachers) {
                    const teacherRes = await getTeacherDetails(teacherId);
                    tempTeachers.push(teacherRes);
                }
                setClassStudents(tempStudents);
                setClassTeachers(tempTeachers);
    
                let maleCount = 0;
                let femaleCount = 0;
                tempStudents.forEach(student => {
                    if(student.gender === "M") {
                        maleCount++;
                    } else {
                        femaleCount++;
                    }
                });
                setCounts({male: maleCount, female: femaleCount});
    
            } catch(err) {
                toastError("Error fetching class details");
            }
        }
        fetchDetails();
    },[]);

    const displayClassTeachers = classTeachers?.map((teacher,index) => (
        <li key = {index}>{teacher.name}</li>
    ))
    const displayClassStudents = classStudents?.map((student,index) => (
        <li key = {index}>{student.name}</li>
    ))
    
    return (
        <main className = "flex min-h-[100vh]">
            <Navbar />
            <section className = "bg-[#fbf6f2] flex-1 p-5">
                <h3 className = "text-[3rem] font-semibold mb-10">Class Information</h3>
                <div className = "flex gap-10">
                    <Card 
                    title = "Class Name" 
                    value = {classDetails?.className}
                    bgradient = "bg-gradient-to-r from-violet-600 to-violet-200"
                    icon = {<FaUserGraduate />}
                    iconcolor = "text-violet-600"
                    shadowcolor= "124,58,237"
                    />
                    <Card 
                    title = "Year" 
                    value = {classDetails?.year}
                    bgradient = "bg-gradient-to-r from-red-400 to-red-200"
                    icon = {<FaCalendarAlt />}
                    iconcolor = "text-red-500"
                    shadowcolor= "239,68,68"
                    />
                    <Card 
                    title = "Month" 
                    value = {convertToMonth(classDetails?.month)}
                    bgradient = "bg-gradient-to-r from-emerald-400 to-teal-200"
                    icon = {<FaCalendarAlt />}
                    iconcolor = "text-emerald-600"
                    shadowcolor = "5,150,105"
                    />
                </div>
                <div className = "flex gap-10 mt-10">
                    <div className = "flex-1">
                        <p className ="p-5 font-bold text-white bg-sky-400">Teachers</p>
                        <ol className = "flex flex-col gap-2 p-5 overflow-y-scroll text-lg font-semibold bg-slate-200 h-[300px]">
                            {displayClassTeachers}
                        </ol>
                    </div>
                    <div className= "flex-1">
                        <p className ="p-5 font-bold text-white bg-indigo-400">Students</p>
                        <ol className = "flex flex-col gap-2 p-5 overflow-y-scroll text-lg font-semibold bg-slate-200 h-[300px]">
                            {displayClassStudents}
                        </ol>
                    </div>
                </div>
                <div className = "flex justify-center w-full mt-14 ">
                    <PieGraph classStudents = {classStudents} counts = {counts}/>
                </div>
            </section>
        </main>
    )
}

export default Class

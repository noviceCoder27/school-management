import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {pathname: path} = useLocation();
    const option = {dashboard: path === "/",classes: path === "/classes",students: path === "/students",teachers: path ==="/teachers"};
    return (
      <div className = {`${params.id ? "w-[23%]" : "w-[30%]"} bg-white`}>
        <h1 className = "text-[3rem] font-bold p-5">SM Info.</h1>
        <hr />
        <nav className = "flex flex-col gap-5 mt-10">
          <div className = {`text-[1.2rem] flex gap-2 pl-5 font-semibold text-[#747d94] items-center cursor-pointer py-5 ${option.dashboard && "bg-gradient-to-r from-orange-100 to-slate-50"} ${option.dashboard && "text-orange-500"}`}  onClick = {() => {navigate("/")}}>
            <MdSpaceDashboard />
            <p>Dashboard</p>
          </div>
          <div className = {`text-[1.2rem] flex gap-2 pl-5 font-semibold text-[#747d94] items-center cursor-pointer py-5 ${option.classes && "bg-gradient-to-r from-orange-100 to-slate-50"} ${option.classes && "text-orange-500"}`}  onClick = {() => { navigate("/classes") }}>
            <FaBookReader />
            <p>Classes</p>
          </div>
           <div className = {`text-[1.2rem] flex gap-2 pl-5 font-semibold text-[#747d94] items-center cursor-pointer py-5 ${option.students && "bg-gradient-to-r from-orange-100 to-slate-50"} ${option.students && "text-orange-500"}`}  onClick = {() => { navigate("/students")}}>
            <PiStudentFill />
            <p>Students</p>
          </div>
          <div className = {`text-[1.2rem] flex gap-2 pl-5 font-semibold text-[#747d94] items-center cursor-pointer py-5 ${option.teachers && "bg-gradient-to-r from-orange-100 to-slate-50"} ${option.teachers && "text-orange-500"}`} onClick = {() => { navigate("/teachers")}}>
            <FaChalkboardTeacher />
            <p>Teachers</p>
          </div>
        </nav>
      </div>
    )
  }
  
  export default Navbar
  
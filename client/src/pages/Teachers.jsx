import { useState } from "react"
import Popup from "../components/ui/Popup"
import Table from "../components/ui/Table"
import Navbar from "../components/Navbar";
import { useDataContext } from "../context/DataContext";



const Teachers = () => {
  const [openPopup,setOpenPopup] = useState(false);
  const details = {isClass: false, 
    isStudent: false,
    name:{label: "Teacher Name",placeholder: "Enter teacher name"},
    gender: {label: "Gender",placeholder: "Enter Gender"},
    salary: {label: "Salary", placeholder: "Enter salary"},
    assignedClass: {label: "Class",placeholder: "Enter class"},
    dateOfBirth: {label: "Date Of Birth",placeholder: "Enter DOB"},
    contact: {label: "Contact",placeholder: "Enter contact details"}
  }
const {teachers} = useDataContext();
  return (
    <main className="flex">
      <Navbar />
       <div className = "relative flex flex-col min-h-[100vh] bg-[#fbf6f2] w-full">
        <h3 className = "text-[3rem] p-5 font-semibold">Teachers</h3>
        <section className = "p-5">
          <button className = "p-3 mb-4 font-semibold text-white rounded-lg bg-sky-400 float-end" onClick={() => setOpenPopup(true)}>Add Teacher</button>
         <Table data = {teachers} student = {false} isClass = {false}/>
        </section>
        <Popup details = {details} openPopup = {openPopup} setOpenPopup = {setOpenPopup}/>
      </div>
    </main>
   
  )
}

export default Teachers

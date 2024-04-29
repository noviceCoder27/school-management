import Table from "../components/ui/Table";
import Popup from "../components/ui/Popup";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useDataContext } from "../context/DataContext";
import { CiSearch } from "react-icons/ci";
import Input from "../components/ui/Input";

const Classes = () => {
  const [openPopup,setOpenPopup] = useState(false);
  const {classes} = useDataContext();
  const details = {isClass: true}
  return (
    <main className = "flex">
      <Navbar />
       <div className = "relative flex flex-col min-h-[100vh] bg-[#fbf6f2] w-full">
        <h3 className = "text-[3rem] p-5 font-semibold">Classes</h3>
        <section className = "p-5">
          <div className="flex">
            <Input />
            <button className = "p-3 mb-4 ml-auto font-semibold text-white rounded-lg bg-sky-400" onClick={() => setOpenPopup(true)}>Add Class</button>
          </div>
          <Table data = {classes} student = {false} setOpenPopup = {setOpenPopup} isClass = {true} />
        </section>
        <Popup details = {details} openPopup = {openPopup} setOpenPopup = {setOpenPopup}/>
      </div>
    </main>
   
  )
}

export default Classes

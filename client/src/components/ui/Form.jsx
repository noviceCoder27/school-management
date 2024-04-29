import { useState } from "react";
import { addClass } from "../../apis/classes";
import { addStudent } from "../../apis/students";
import { addTeacher } from "../../apis/teachers";
import { useDataContext } from "../../context/DataContext";



const Form = ({details,setOpenPopup}) => {
    const [classDetails,setClassDetails] = useState({name: "",year: "", month: "January"});
    const [info,setInfo] = useState({name: "",fees:0,dob: "",className: "",gender:"M",contact: "",salary: 0})
    const {classNames,setTeachers,setClasses,setStudents,setToUpdate} = useDataContext();
    const classOptions = classNames?.map((name,index) => <option key = {index}>{name}</option>)

    const checkPhone = (phone) => {
        if(phone.length !== 13) {
            return false;
        }
        return true;
    }
    const setClass = async () => {
        try {
            const res = await addClass(classDetails);
            setClasses(prev => prev.length ? [...prev,res]: [res]);
            setOpenPopup(false);
        } catch(err) {
            console.log(err);
        }
    }
    const setStudent = async() => {
        if(!checkPhone(info.contact)) {
            return;
        }
        try {
            const res = await addStudent(info);
            setStudents(prev => prev.length ? [...prev,res]: [res])
            setOpenPopup(false);
            setToUpdate(prev => !prev);
        } catch(err) {
            console.log(err);
        }
    }

    const setTeacher = async() => {
        if(!checkPhone(info.contact)) {
            return;
        }
        try {
            const res = await addTeacher(info);
            setTeachers(prev => prev.length ? [...prev,res]: [res])
            setOpenPopup(false);
            setToUpdate(prev => !prev)
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <form className="p-5 w-[30vw]">
            <h4 className="text-[3rem] mb-5 text-indigo-400">Enter details</h4>
            <div className = "flex flex-col gap-2">
                {details.isClass ? 
                <>
                    <div className = "flex gap-2">
                        <label htmlFor="name" className = "flex-1">Class Name:</label>
                        <input id = "name" type="text" placeholder = "Enter class name" className= "flex-grow border-2" onChange = {(e) => setClassDetails(prev => ({...prev,name: e.target.value}))}/>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="year" className = "flex-1">Year:</label>
                        <input id = "year" type="text" placeholder = "Enter year" className= "flex-grow border-2" onChange = {(e) => setClassDetails(prev => ({...prev,year:e.target.value}))}/>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="month">Month:</label>
                        <select id = "month" type="text" value = {classDetails.month} className= "w-32 ml-[68px] border-2 " onChange = {(e) => setClassDetails(prev => ({...prev,month: e.target.value}))}>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                </>:
                <>
                    <div className = "flex gap-2">
                        <label htmlFor="name" className = "flex-1">{details.name.label}</label>
                        <input id = "name" type="text" placeholder = {details.name.placeholder} className= "flex-grow border-2" value = {info.name} onChange={(e) => setInfo(prev => ({...prev,name:e.target.value}))}/>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="gender">{details.gender.label}</label>
                        <select id = "gender" type="text" className = "w-12 ml-16 border-2" value = {info.gender} onChange={(e) => setInfo(prev => ({...prev,gender:e.target.value}))}>
                            <option value = "M">M</option>
                            <option value = "F">F</option>
                        </select>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="money" className = "flex-1">
                            {details.isStudent ? details.fees.label: details.salary.label}
                            </label>
                        <input id = "money" type="text" placeholder = {details.isStudent ? details.fees.placeholder: details.salary.placeholder} className= "flex-grow border-2" value = {details.isStudent ? info.fees: info.salary} onChange={(e) => {
                            if(details.isStudent) {
                                setInfo(prev => ({...prev,fees: e.target.value}))
                            } else {
                                setInfo(prev => ({...prev,salary: e.target.value}))
                            }
                        }}/>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="class">{details.assignedClass.label}</label>
                        <select className = "ml-20 border-2" value = {info.className} onChange = {(e) => setInfo(prev => ({...prev,className:e.target.value}))}>
                            <option value="select-class">Select Class</option>
                            {classOptions}
                        </select>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="dob" className = "flex-1">{details.dateOfBirth.label}</label>
                        <input id = "dob" type="text" placeholder = {details.dateOfBirth.placeholder} className= "flex-grow border-2" value = {info.dob} onChange={(e) => setInfo(prev => ({...prev,dob:e.target.value}))}/>
                    </div>
                    <div className = "flex gap-2">
                        <label htmlFor="contact" className = "flex-1">{details.contact.label}</label>
                        <input id = "contact" type="text" placeholder = {details.contact.placeholder} className= "flex-grow border-2" value = {info.contact} onChange={(e) => setInfo(prev => ({...prev,contact:e.target.value}))}/>
                    </div>
                </>}
            </div>
            <div className = "mt-10 mb-5 float-end">
                <button className = "p-2 mr-4 text-white bg-red-300 rounded-md hover:bg-red-400"  onClick= {(e) => {
                    e.preventDefault()
                    setOpenPopup(false)
                    }}>Cancel</button>
                <button className = "p-2 text-white bg-indigo-300 rounded-md hover:bg-indigo-400" onClick={(e) => {
                     e.preventDefault()
                    if(details.isClass) {
                        setClass();
                    } else {
                        details.isStudent ? setStudent() : setTeacher();
                    }
                }}>Create</button>
            </div>
        </form>
    )
}

export default Form

import { createContext, useState, useContext, useEffect } from "react";
import { getClassNames, getClasses } from "../apis/classes";
import { getTeachers } from "../apis/teachers";
import { getStudents } from "../apis/students";
import { toastError } from "../utils/toastMessage";

export const CreateDataContext = createContext("");

export const DataContextProvider = ({children}) => {
    const [classes,setClasses] = useState(null);
    const [students,setStudents] = useState(null);
    const [teachers,setTeachers] = useState(null);
    const [classNames,setClassNames]= useState(null);
    const [toUpdate,setToUpdate] = useState(false);
    const [searchStr,setSearchStr] = useState("");

    useEffect(() => {
        const fetchClassData = async() => {
            try {
                const allClasses = await getClasses(searchStr);
                setClasses(allClasses);
            } catch(err) {
                toastError("Error fetching classes");
            }
        }
        fetchClassData();
    },[toUpdate,searchStr])

    useEffect(() => {
        const fetchTeacherData = async() => {
            try {
                const allTeachers = await getTeachers(searchStr);
                setTeachers(allTeachers);
            } catch(err) {
                toastError("Error fetching teachers")
            }
        }
        const fetchStudentData = async() => {
            try {
                const allStudents = await getStudents(searchStr);
                setStudents(allStudents);
            } catch(err) {
                toastError("Error fetching students")
            }
        }
        const fetchClassNames = async() => {
            try {
                const allNames = await getClassNames();
                setClassNames(allNames);
            } catch(err) {
                toastError("Error fetching class names")
            }
        }
        fetchTeacherData();
        fetchStudentData();
        fetchClassNames();
    },[classes,searchStr])

    return (
        <CreateDataContext.Provider value = {{setSearchStr,classNames,setToUpdate,classes,students,teachers,setClasses,setStudents,setTeachers}}>
            {children}
        </CreateDataContext.Provider>
    )
}

export const useDataContext = () => {
   return useContext(CreateDataContext);
}
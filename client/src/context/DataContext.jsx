import { createContext, useState, useContext, useEffect } from "react";
import { getClassNames, getClasses } from "../apis/classes";
import { getTeachers } from "../apis/teachers";
import { getStudents } from "../apis/students";

export const CreateDataContext = createContext("");

export const DataContextProvider = ({children}) => {
    const [classes,setClasses] = useState(null);
    const [students,setStudents] = useState(null);
    const [teachers,setTeachers] = useState(null);
    const [classNames,setClassNames]= useState(null);
    const [toUpdate,setToUpdate] = useState(false);

    useEffect(() => {
        const fetchClassData = async() => {
            try {
                const allClasses = await getClasses();
                setClasses(allClasses);
            } catch(err) {
                console.log(err);
            }
        }
        fetchClassData();
    },[toUpdate])

    useEffect(() => {
        const fetchTeacherData = async() => {
            try {
                const allTeachers = await getTeachers();
                setTeachers(allTeachers);
            } catch(err) {
                console.log(err);
            }
        }
        const fetchStudentData = async() => {
            try {
                const allStudents = await getStudents();
                setStudents(allStudents);
            } catch(err) {
                console.log(err);
            }
        }
        const fetchClassNames = async() => {
            try {
                const allNames = await getClassNames();
                setClassNames(allNames);
            } catch(err) {
                console.log(err);
            }
        }
        fetchTeacherData();
        fetchStudentData();
        fetchClassNames();
    },[classes])

    return (
        <CreateDataContext.Provider value = {{classNames,setToUpdate,classes,students,teachers,setClasses,setStudents,setTeachers}}>
            {children}
        </CreateDataContext.Provider>
    )
}

export const useDataContext = () => {
   return useContext(CreateDataContext);
}
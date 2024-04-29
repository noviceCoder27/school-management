import { FaSchool } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import Card from "../components/ui/Card";
import Navbar from './../components/Navbar';
import { useEffect, useState } from "react";
import { getAllData, getIncomeDetails } from "../apis/classes";
import { FaRupeeSign  } from "react-icons/fa";
import { toastError } from "../utils/toastMessage";

const Dashboard = () => {
  const [counts,setCounts] = useState({classCount: 0, teacherCount: 0,studentCount: 0 });
  const [timePeriod,setTimePeriod] = useState({year:true,month: false});
  const [years,setYears] = useState([]);
  const [currentTime,setCurrentTime] = useState({year: "", month: "January"});
  const [incomeDetails,setIncomeDetails] = useState({expense: 0, income: 0});
  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await getAllData();
        setCounts({classCount: res.classCount, teacherCount:res.teacherCount,studentCount: res.studentCount});
        setYears(res.years); 
      } catch(err) {
        toastError("Error fetching data");
      }
    }
    fetchData()
  },[]);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await getIncomeDetails(timePeriod.year,currentTime.year,currentTime.month);
        setIncomeDetails({expense: res?.expense,income: res?.income})
      } catch(err) {
        toastError("Error fetching income details");
      }
    }
    fetchData()
  },[currentTime,timePeriod]);
  
  const displayYears = years?.map((year,index) => (
    <option key = {index} value = {year}>{year}</option>
  ))
  return (
    <main className="flex">
       <Navbar />
       <div className = "flex flex-col p-5 min-h-[100vh] bg-[#fbf6f2] w-full">
        <h3 className = "text-[3rem]  font-semibold">Dashboard</h3>
        <section className = "flex justify-between gap-10 mt-10">
          <Card 
          bgradient = "bg-gradient-to-r from-orange-400 to-orange-200" 
          shadowcolor= "251,146,60"
          iconcolor = "text-orange-400"
          value = {counts?.classCount || "--"}
          title = "Classes" 
          icon = {<FaSchool />}
          />
          <Card 
          bgradient = "bg-gradient-to-r from-indigo-400 to-indigo-200" 
          shadowcolor= "129,140,248"
          iconcolor = "text-indigo-400"
          value = {counts?.teacherCount || '--'}
          title = "Teachers" 
          icon = {<FaUserTie />}
          />
          <Card 
          bgradient = "bg-gradient-to-r from-sky-400 to-sky-200" 
          shadowcolor= "56,189,248"
          iconcolor = "text-sky-400"
          value = {counts?.studentCount || "--"}
          title = "Students" 
          icon = {<FaUserGraduate />}
          />
        </section>
        <section className = "relative flex flex-1 gap-10 p-5 mt-10 border-2 border-orange-400 shadow-md shadow-orange-400">
          <div className = "w-[32%] text-3xl flex gap-5 flex-col">
            <select className = "p-3 border-2 rounded-md shadow-md shadow-slate-300"
            value = {timePeriod.year? "Year": "Month"} onChange = {(e) => {
              if(e.target.value === "Month") {
                setTimePeriod({year: false, month: true})
              } else {
                setTimePeriod({year:true,month: false})
              }
            }}>
              <option value = "Year" >Year</option>
              <option value = "Month">Month</option>
            </select>
            {timePeriod.year ? 
                <select className = "p-3 border-2 rounded-md shadow-md shadow-slate-300" onChange = {(e) => setCurrentTime(prev => ({...prev,year:e.target.value}))}>
                  <option></option>
                  {displayYears}
                </select>:
                <select className = "p-3 border-2 rounded-md shadow-md shadow-slate-300" onChange = {(e) => setCurrentTime(prev => ({...prev,month:e.target.value}))}>
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
            }
          </div>
          <div className = "flex w-[68%] gap-10 max-h-[150px]">
            <Card 
            bgradient = "bg-gradient-to-r from-teal-500 to-teal-200" 
            shadowcolor= "129,140,248"
            iconcolor = "text-teal-400"
            value = {incomeDetails?.expense || '--'}
            title = "Expense" 
            icon = {<FaRupeeSign   />}
            />
            <Card 
            bgradient = "bg-gradient-to-r from-green-400 to-green-200" 
            shadowcolor= "129,140,248"
            iconcolor = "text-green-400"
            value = {incomeDetails?.income || '--'}
            title = "Income" 
            icon = {<FaRupeeSign   />}
            />
          </div>
          <p className= "absolute font-semibold bottom-5">*Expenditure and Profit Statistics</p>
        </section>
      </div>
    </main>
    
  )
}

export default Dashboard

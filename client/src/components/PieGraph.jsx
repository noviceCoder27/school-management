import Chart from 'chart.js/auto';
import { useMemo } from 'react';
import { Pie } from "react-chartjs-2";

const PieGraph = ({classStudents,counts}) => {
    const data = useMemo(() => {
        const chartData = {};
        if(classStudents) {
            chartData.labels = ["Male","Female"];
            chartData.datasets = [
                {
                    data: [counts.male,counts.female],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                        
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ]
                }
            ]
        }
        return chartData;
    },[classStudents]);
    const config = {
        type: 'pie',
        data: data,
        options: {
          responsive: true
        },
    };
    
    return (
        <div className = "w-[40%] flex flex-col  items-center border-2  p-5 rounded-xl shadow-md shadow-orange-400 bg-slate-50">
            <Pie data = {data} options={config}/>
            <p className = "mt-2 font-bold">Male to Female Student Count</p>
        </div>
    )
}

export default PieGraph

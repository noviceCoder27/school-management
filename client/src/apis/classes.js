import axios from 'axios'
import { convertMonth } from '../utils/convertMonth';
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const addClass = async (classDetails) => {
    const details = {className: classDetails.name,year: classDetails.year,month: convertMonth(classDetails.month)}
    try {
        const response = await axios.post(`${backend_url}/classes/add`,details);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getClasses = async(search) => {
    try {
        const response = await axios.get(`${backend_url}/classes?search=${search}`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getClassNames = async() => {
    try {
        const response = await axios.get(`${backend_url}/classes/names`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getClassDetails = async(id) => {
    if(id) {
        try {
            const response = await axios.get(`${backend_url}/classes/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const getAllData = async() => {
    try {
        const response = await axios.get(`${backend_url}/classes/all`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const deleteClass = async(id) => {
    if(id) {
        try {
            const response = await axios.delete(`${backend_url}/classes/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    } 
}

export const updateClass = async(id,details) => {
    if(id) {
        try {
            const response = await axios.patch(`${backend_url}/classes/${id}`,details);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const getIncomeDetails = async(time,year,month) => {
    try {
        const response = await axios.get(`${backend_url}/classes/income/?time=${time}&year=${year}&month=${convertMonth(month)}`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
    
}
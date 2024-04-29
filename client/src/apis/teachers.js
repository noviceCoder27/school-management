import axios from 'axios'
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const addTeacher = async (studentDetails) => {
    try {
        const response = await axios.post(`${backend_url}/teachers/add`,studentDetails);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getTeachers = async(search) => {
    try {
        const response = await axios.get(`${backend_url}/teachers?search=${search}`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getTeacherDetails = async(id) => {
    if(id) {
        try {
            const response = await axios.get(`${backend_url}/teachers/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const deleteTeacher = async(id) => {
    if(id) {
        try {
            const response = await axios.delete(`${backend_url}/teachers/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}
import axios from 'axios'
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const addTeacher = async (studentDetails) => {
    try {
        const response = await axios.post(`${backend_url}/teachers/add`,studentDetails);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export const getTeachers = async() => {
    try {
        const response = await axios.get(`${backend_url}/teachers`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export const getTeacherDetails = async(id) => {
    if(id) {
        try {
            const response = await axios.get(`${backend_url}/teachers/${id}`);
            return response.data;
        } catch(err) {
            console.log(err);
        }
    }
}

export const deleteTeacher = async(id) => {
    if(id) {
        try {
            const response = await axios.delete(`${backend_url}/teachers/${id}`);
            return response.data;
        } catch(err) {
            console.log(err);
        }
    }
}
import axios from 'axios'
const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export const addStudent = async (studentDetails) => {
    try {
        const response = await axios.post(`${backend_url}/students/add`,studentDetails);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getStudents = async(search) => {
    try {
        const response = await axios.get(`${backend_url}/students?search=${search}`);
        return response.data;
    } catch(err) {
        throw new Error(err);
    }
}

export const getStudentDetails = async(id) => {
    if(id) {
        try {
            const response = await axios.get(`${backend_url}/students/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const deleteStudent = async(id) => {
    if(id) {
        try {
            const response = await axios.delete(`${backend_url}/students/${id}`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

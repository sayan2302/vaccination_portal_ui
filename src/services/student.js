import axios from "./axiosInstance";

export const getStudents = async () => {
    try {
        return await axios.get('/get-students')
    } catch (error) {
        return error.response.data.message;
    }
}


export const editStudent = async (payload) => {
    try {
        return await axios.post('/edit-student', payload)
    } catch (error) {
        return error.response.data.message;
    }
}


export const addStudent = async (payload) => {
    try {
        return await axios.post('/add-student', payload)
    } catch (error) {
        return error.response.data.message;
    }
}



export const updateVax = async (payload) => {
    try {
        return await axios.post('/update-vaccination', payload)
    } catch (error) {
        return error.response.data.message;
    }
}


export const getFilteredStudents = async (payload) => {
    try {
        return await axios.post('/get-students', payload)
    } catch (error) {
        return error.response.data.message;
    }
}

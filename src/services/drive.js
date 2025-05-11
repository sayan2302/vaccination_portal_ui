import axios from "./axiosInstance";

export const getDrives = async () => {
    try {
        return await axios.get('/get-drives')
    } catch (error) {
        return error.response.data.message;
    }
}

export const editDrive = async (payload) => {
    try {
        return await axios.post('/edit-drive', payload)
    } catch (error) {
        return error.response.data.message;
    }
}

export const addDrive = async (payload) => {
    try {
        return await axios.post('/add-drive', payload)
    } catch (error) {
        return error.response.data.message;
    }
}
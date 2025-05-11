import axios from "./axiosInstance";

export const login = async (payload) => {
    try {
        return await axios.post('/login', payload)
    } catch (error) {
        return error.response.data.message;
    }
}
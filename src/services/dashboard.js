import axios from "./axiosInstance";

export const getDashboardData = async () => {
    try {
        return await axios.get('/dashboard')
    } catch (error) {
        return error.response.data.message;
    }
}
import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://vaccination-portal-backend.vercel.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/api/v2',
    baseURL: "https://dashboard-production-app-cf34728c58a8.herokuapp.com/api/v2",
    headers: {
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



export default axiosInstance;

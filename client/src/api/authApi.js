import axiosInstance from "./axiosConfig"
import { addToast } from '../features/toast/actions/toastAction'

export const loginUser = async (username, password,dispatch) => {
    try {
        const response = await axiosInstance.post('/dashboard/auth/login', { username, password });
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}



export const PasswordChange = async (data,dispatch) => {
    try {
        const response = await axiosInstance.put('/dashboard/auth/change-password', data);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}
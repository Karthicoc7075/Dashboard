import axiosInstance from "./axiosConfig";
import { addToast } from '../features/toast/actions/toastAction'

export const CreateUser = async (data,dispatch) => {
    try {
        const response = await axiosInstance.post('/dashboard/user/users', data);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}

export const GetUsers = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/dashboard/user/users');
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}

export const GetUser = async (id,dispatch) => {
    try {
        const response = await axiosInstance.get(`/dashboard/user/users/${id}`);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}

export const EditUser = async (id,data,dispatch) => {
    try {
        const response = await axiosInstance.put(`/dashboard/user/users/${id}`, data);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}

export const DeleteUser = async (id,dispatch) => {
    try {
        const response = await axiosInstance.delete(`/dashboard/user/users/${id}`);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}
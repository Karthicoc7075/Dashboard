import axiosInstance from "./axiosConfig";
import { addToast } from '../features/toast/actions/toastAction'

export const GetAppSettings = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/setting/app');
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateAppSettings = async (id,data,dispatch) => {
    try {
        const response = await axiosInstance.put(`/setting/app/update/${id}`, data);
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const GetAdsSettings = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/setting/ads');
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateAdsSettings = async (id,data,dispatch) => {
    try {
        const response = await axiosInstance.put(`/setting/ads/update/${id}`, data);
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


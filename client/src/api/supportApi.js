import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";


export const GetAllSupports = async(dispatch) => {
    try {
        const response = await axiosInstance.get('/support/allSupports');
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const DeleteSupport = async(id,dispatch) => {
    try {
        const response = await axiosInstance.delete(`/support/delete/${id}`);
        dispatch(addToast(response.data.message, 'success'));
        return response.data;
    } catch (error) {
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const SovleSupport = async(id,dispatch) => {
    try {
        const response = await axiosInstance.put(`/support/solve/${id}`);
        dispatch(addToast(response.data.message, 'success'));
        return response.data;
    } catch (error) {
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}
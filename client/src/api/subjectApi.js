import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";



export const GetAllSubjects = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/subject/allSubjects');
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const GetSubject = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(`/subject/${id}`);
        return response.data;
    } catch (error) {
       
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
       
    }
}


export const CreateSubject = async (data, dispatch) => {
    try {
        const response = await axiosInstance.post('/subject/create', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
       
    }
}


export const UpdateSubject = async (id, data, dispatch) => {
    try {
        const response = await axiosInstance.put(`/subject/update/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
       
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
       
    }
}

export const DeleteSubject = async (id, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/subject/delete/${id}`);
        return response.data;
    } catch (error) {
       
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
       
    }
}


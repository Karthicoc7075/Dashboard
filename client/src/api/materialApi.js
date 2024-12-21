import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";



export const GetAllMaterials = async (query,limit,dispatch) => {
    try {
        const response = await axiosInstance.get(`/material/allMaterials?page=${query}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log( );
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}


export const GetMaterial = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(`/material/getMaterial/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}

export const CreateMaterial = async (data, dispatch) => {
    try {
        const response = await axiosInstance.post('/material/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}

export const UpdateMaterial = async (id, data, dispatch) => {
    try {
        const response = await axiosInstance.put(`/material/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}


export const DeleteMaterial = async (id, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/material/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}

export const UpdateMaterialStatus = async (id, dispatch) => {
    try {
        const response = await axiosInstance.put(`/material/updateStatus/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
          dispatch(addToast(error.response?.data?.message  || error.message, 'error'))
    }
}
import axiosInstance from "./axiosConfig";
import {addToast} from '../features/toast/actions/toastAction'


export const GetAllCategories = async (dispatch) => {
    
    try {
        const response = await axiosInstance.get("/category/allCategories");
        return response.data;
    } catch (error) {
       dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}

export const GetCategory = async (categoryId, dispatch) => {
    try {
        const response = await axiosInstance.get(`/category/${categoryId}`);
        return response.data;
    }
    catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }

}

export const CreateCategory = async (formData, dispatch) => {
    try {
        const response = await axiosInstance.post("/category/create", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        
        })
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}

export const UpdateCategory = async (categoryId,formData, dispatch) => {
    try {
        const response = await axiosInstance.put(`/category/update/${categoryId}`,formData);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}

export const DeleteCategory = async (categoryId, data,dispatch) => {
    try {
        const response = await axiosInstance.delete(`/category/delete/${categoryId}`,{
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        
        })
        return response.data;
    }catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}

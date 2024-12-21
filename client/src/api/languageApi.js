import axiosInstance from "./axiosConfig";
import {addToast} from '../features/toast/actions/toastAction'

export const GetAllLanguages = async (dispatch) => {
        
        try {
            const response = await axiosInstance.get("/language/allLanguages");
            return response.data;
        } catch (error) {
            console.log(error)
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
        }
    }

export const GetLanguage = async (languageId, dispatch) => {

    try {
        const response = await axiosInstance.get(`/language/${languageId}`);
        return response.data;
    }
    catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }

}


export const CreateLanguage = async (formData, dispatch) => {
    try {
        const response = await axiosInstance.post("/language/create", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        
        })
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}

export const UpdateLanguage = async (languageId,formData, dispatch) => {
    try {
        const response = await axiosInstance.put(`/language/update/${languageId}`,formData);
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}


export const DeleteLanguage = async (languageId, data,dispatch) => {
    try {
        const response = await axiosInstance.delete(`/language/delete/${languageId}`, {
            headers: {
            'Content-Type': 'application/json'
            },
            data: data
        });
        return response.data;
    }catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'))
    }
}



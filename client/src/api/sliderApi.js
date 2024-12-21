import axiosInstance from "./axiosConfig";
import {addToast} from '../features/toast/actions/toastAction'


export const GetAllSliders = async (dispatch) => {
            
            try {
                const response = await axiosInstance.get("/slider/allSliders");
                return response.data;
            } catch (error) {
             dispatch(addToast(error.response?.data?.message || error.message, 'error'));
            }
        }

export const GetSlider = async (sliderId, dispatch)=> {

    try {
        const response = await axiosInstance.get(`/slider/${sliderId}`);
        return response.data;
    }
    catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }

}


export const CreateSlider = async (formData, dispatch) => {
    try {
        const response = await axiosInstance.post("/slider/create", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        
        })
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const UpdateSlider = async (sliderId,formData, dispatch) => {
    try {
        const response = await axiosInstance.put(`/slider/update/${sliderId}`,formData);
        return response.data;
    } catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}



export const DeleteSlider = async (sliderId, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/slider/delete/${sliderId}`);
        return response.data;
    }catch (error) {
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}
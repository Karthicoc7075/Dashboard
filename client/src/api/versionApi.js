import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";

export const GetAllVersions = async(dispatch) => {
    try{
     const res= await  axiosInstance.get('/version/allVersions')
     return res.data
    }catch(error){
       dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const GetVersion = async(id,dispatch) => {
    try{
        const res= await  axiosInstance.get(`/version/${id}`)
        return res.data
    }
    catch(error){
       dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const CreateVersion = async(data,dispatch) => {
    try{
        const res= await  axiosInstance.post('/version/create',data)
        return res.data
    }catch(error){
       dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateVersion = async(id,data,dispatch) => {
    try{
        const res= await  axiosInstance.put(`/version/update/${id}`,data)
        return res.data
    }catch(error){
        console.log(error.response.data.message);
       dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const DeleteVersion = async(id,dispatch) => {
    try{
        const res= await  axiosInstance.delete(`/version/delete/${id}`)
        return res.data
    }catch(error){
       dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}
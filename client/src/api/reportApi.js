import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";


export const GetReports = async(dispatch)=>{
    try{
        const res =await axiosInstance.get('/report/allReports');
        return res.data;
    }catch(error){
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const SolveReport = async(id,dispatch)=>{
    try{
        const res =await axiosInstance.put(`/report/solve/${id}`);
        return res.data;
    }catch(error){
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const DeleteReport = async(id,dispatch)=>{
    try{
        const res =await axiosInstance.delete(`/report/delete/${id}`);
        return res.data;
    }catch(error){
         dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


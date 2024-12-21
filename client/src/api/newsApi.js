import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";


export const GetAllNews =async(dispatch)=>{
    try{
        const res = await axiosInstance.get('/news/allNews')
        return res.data
    }catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const GetNews = async(id,dispatch)=>{
    try{
        const res = await axiosInstance.get(`/news/${id}`)
        return res.data
    }catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const CreateNews = async(data,dispatch)=>{
    try{
        const res = await axiosInstance.post('/news/create',data)
        return res.data
    }catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateNews = async(id,data,dispatch)=>{
    try{
        const res = await axiosInstance.put(`/news/update/${id}`,data)
        return res.data
    }catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const DeleteNews = async(id,dispatch)=>{
    try{
        const res = await axiosInstance.delete(`/news/delete/${id}`)
        return res.data
    }catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const UpdateNewsStatus = async(id,dispatch)=>{
    try{
        const res = await axiosInstance.put(`/news/updateStatus/${id}`,)
        return res.data
    }
    catch(error){
          dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


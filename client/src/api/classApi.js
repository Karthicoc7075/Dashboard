import axiosInstance from './axiosConfig';
import { addToast } from '../features/toast/actions/toastAction';
import subject from '../pages/subject/subject';


export const GetAllClasses = async (dispatch) => {
    
    try {
        const response = await axiosInstance.get('/class/AllClasses');
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const GetClass = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(`/class/${id}`);
        return response.data;
    } catch (error) {

        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const CreateClass = async (data, dispatch) => {
    try {
        const response = await axiosInstance.post('/class/create', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateClass = async (id, data, dispatch) => {
    try {
        const response = await axiosInstance.put(`/class/update/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const DeleteClass = async (id, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/class/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}



export const CreateClassSubject = async (classId,subjectId, dispatch) => {
    try {
        const response = await axiosInstance.post(`/class/${classId}/subject/${subjectId}`);
        return response.data;
    } catch (error) {
                dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const GetClassSubject = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(`/class/${id}/subjects`);
        return response.data;
    } catch (error) {
                dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const DeleteClassSubject = async (classId,subjectId, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/class/${classId}/subject/${subjectId}`);
        return response.data;
    } catch (error) {
                dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}
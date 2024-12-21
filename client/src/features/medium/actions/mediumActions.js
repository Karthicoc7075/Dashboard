import * as Types from '../contants/actionTypes';
import { GetAllMediums,GetMedium,CreateMedium,UpdateMedium,DeleteMedium,UpdateMediumStatus } from '../../../api/mediumApi';
import { addToast } from '../../toast/actions/toastAction';

export const getAllMediums =()=>async(dispatch)=>{
    dispatch({type:Types.GET_ALL_MEDIUMS_REQUEST});
    try {
        const response = await GetAllMediums(dispatch);
        const data = response.data; 
        dispatch({type:Types.GET_ALL_MEDIUMS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:Types.GET_ALL_MEDIUMS_FAILURE,payload:error});
    }
}

export const getMedium =(id)=>async(dispatch)=>{
    dispatch({type:Types.GET_MEDIUM_REQUEST});
    try {
        const response = await GetMedium(id,dispatch);
        const data = response.data;
        dispatch({type:Types.GET_MEDIUM_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:Types.GET_MEDIUM_FAILURE,payload:error});
    }
}

export const createMedium =(formdata)=>async(dispatch)=>{
    dispatch({type:Types.CREATE_MEDIUM_REQUEST});
    try {
        const response = await CreateMedium(formdata,dispatch);
        const data = response.data;
        dispatch({type:Types.CREATE_MEDIUM_SUCCESS,payload:data});
        dispatch(addToast(response.message,'success'));
    } catch (error) {
        dispatch({type:Types.CREATE_MEDIUM_FAILURE,payload:error});
    }
}

export const updateMedium =(id,formdata)=>async(dispatch)=>{
    dispatch({type:Types.UPDATE_MEDIUM_REQUEST});
    try {
        const response = await UpdateMedium(id,formdata,dispatch);
        const data = response.data;
        dispatch({type:Types.UPDATE_MEDIUM_SUCCESS,payload:data});
        dispatch(addToast(response.message,'success'));
    } catch (error) {
        dispatch({type:Types.UPDATE_MEDIUM_FAILURE,payload:error});
    }
}

export const deleteMedium =(id)=>async(dispatch)=>{
    dispatch({type:Types.DELETE_MEDIUM_REQUEST});
    try {
        const response = await DeleteMedium(id,dispatch);
        const data = response.data;
        dispatch({type:Types.DELETE_MEDIUM_SUCCESS,payload:data});
        dispatch(addToast(response.message,'success'));
    } catch (error) {
        dispatch({type:Types.DELETE_MEDIUM_FAILURE,payload:error});
    }
}


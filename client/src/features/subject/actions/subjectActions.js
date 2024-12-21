import * as types from '../contants/actionsTypes';
import { GetAllSubjects,GetSubject,CreateSubject,UpdateSubject,DeleteSubject } from '../../../api/subjectApi'
import {addToast} from '../../toast/actions/toastAction'

export const getAllSubjects = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_SUBJECTS_REQUEST });
    try {
        const response = await GetAllSubjects(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_ALL_SUBJECTS_SUCCESS , payload });
    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_ALL_SUBJECTS_FAILURE, error });
    }
}


export const getSubject = (id) => async (dispatch) => {
    dispatch({ type: types.GET_SUBJECT_REQUEST });
    try {
        const response = await GetSubject(id, dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_SUBJECT_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_SUBJECT_FAILURE, error });
    }
}

export const createSubject = (data) =>async(dispatch) =>{
    dispatch({type:types.CREATE_SUBJECT_REQUEST})
    try{
        const response = await CreateSubject(data, dispatch)
        const payload = response.data
        dispatch({type:types.CREATE_SUBJECT_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.CREATE_SUBJECT_FAILURE, error})
    }
}


export const updateSubject = (id, data) =>async(dispatch) =>{
    dispatch({type:types.UPDATE_SUBJECT_REQUEST})
    try{
        const response = await UpdateSubject(id, data, dispatch)
        const payload = response.data
        dispatch({type: types.UPDATE_SUBJECT_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.UPDATE_SUBJECT_FAILURE , error})
    }
}

export const deleteSubject = (id) => async(dispatch) =>{
    dispatch({type:types.DELETE_SUBJECT_REQUEST})
    try{
        const response = await DeleteSubject(id, dispatch)
        const payload = response.data
        dispatch({type: types.DELETE_SUBJECT_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.DELETE_SUBJECT_FAILURE , error})
    }
}
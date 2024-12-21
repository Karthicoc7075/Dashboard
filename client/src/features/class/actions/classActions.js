import * as types from '../contants/actionsTypes'
import {GetAllClasses, GetClass,CreateClass,UpdateClass,DeleteClass, GetClassSubject,CreateClassSubject, DeleteClassSubject} from '../../../api/classApi'
import {addToast} from '../../toast/actions/toastAction'

export const getAllClasses = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_CLASSES_REQUEST });
    try {
        const response = await GetAllClasses(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_ALL_CLASSES_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_CLASSES_FAILURE, error });
    }
}

export const getClass = (id) => async (dispatch) => {
    dispatch({ type: types.GET_CLASS_REQUEST });
    try {
        const response = await GetClass(id, dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_CLASS_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_CLASS_FAILURE, error });
    }
}

export const createClass = (data) =>async(dispatch) =>{    
    dispatch({type:types.CREATE_CLASS_REQUEST})
    try{
        const response = await CreateClass(data, dispatch)
        const payload = response.data
        dispatch({type:types.CREATE_CLASS_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.CREATE_CLASS_FAILURE, error})
    }
}

export const updateClass = (id, data) =>async(dispatch) =>{
    dispatch({type:types.UPDATE_CLASS_REQUEST})
    try{
        const response = await UpdateClass(id, data, dispatch)
        const payload = response.data
        dispatch({type: types.UPDATE_CLASS_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.UPDATE_CLASS_FAILURE , error})
    }
}


export const deleteClass = (id) =>async(dispatch) =>{
    dispatch({type:types.DELETE_CLASS_REQUEST})
    try{
        const response = await DeleteClass(id, dispatch)
        console.log(response);
        const payload = response.data
        dispatch({type:types.DELETE_CLASS_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.DELETE_CLASS_FAILURE, error})
    }
}

export const getManageClass = (id) => async (dispatch) => {
    dispatch({ type: types.GET_CLASS_SUBJECT_REQUEST });
    try {
        const response = await GetClassSubject(id, dispatch);
        const payload = response.data;
        const classId = id
        dispatch({ type: types.GET_CLASS_SUBJECT_SUCCESS , payload,classId });
    } catch (error) {
        dispatch({ type: types.GET_CLASS_SUBJECT_FAILURE, error });
    }
}


export const createClassSubject = (classId, subjectId) =>async(dispatch) =>{
    dispatch({type:types.CREATE_CLASS_SUBJECT_REQUEST})
    try{
        const response = await CreateClassSubject(classId,subjectId, dispatch)
        const payload = response.data
        dispatch({type: types.CREATE_CLASS_SUBJECT_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.CREATE_CLASS_SUBJECT_FAILURE , error})
    }
}

export const deleteClassSubject = (classId,subjectId) =>async(dispatch) =>{
    dispatch({type:types.DELETE_CLASS_SUBJECT_REQUEST})
    try{
        const response = await DeleteClassSubject(classId,subjectId, dispatch)
        const payload = response.data
        dispatch({type:types.DELETE_CLASS_SUBJECT_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.DELETE_CLASS_SUBJECT_FAILURE, error})
    }
}
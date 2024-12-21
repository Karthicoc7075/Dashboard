import * as types from '../contants/actionTypes'
import {GetAllLanguages,GetLanguage,CreateLanguage,UpdateLanguage,DeleteLanguage} from '../../../api/languageApi'
import { addToast } from '../../toast/actions/toastAction'


export const getAllLanguages = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_LANGUAGES_REQUEST });
    try {
        const response = await GetAllLanguages(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_ALL_LANGUAGES_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_LANGUAGES_FAILURE, error });
    }
}

export const getLanguage = (id) => async (dispatch) => {
    dispatch({ type: types.GET_LANGUAGE_REQUEST });
    try {
        const response = await GetLanguage(id, dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_LANGUAGE_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_LANGUAGE_FAILURE, error });
    }
}

export const createLanguage = (data) =>async(dispatch) =>{    
    dispatch({type:types.CREATE_LANGUAGE_REQUEST})
    try{
        const response = await CreateLanguage(data, dispatch)
        const payload = response.data
        dispatch({type:types.CREATE_LANGUAGE_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.CREATE_LANGUAGE_FAILURE, error})
    }
}

export const updateLanguage = (id, data) =>async(dispatch) =>{
    dispatch({type:types.UPDATE_LANGUAGE_REQUEST})
    try{
        const response = await UpdateLanguage(id, data, dispatch)
        const payload = response.data
        dispatch({type: types.UPDATE_LANGUAGE_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.UPDATE_LANGUAGE_FAILURE , error})
    }
}

export const deleteLanguage = (id,data) =>async(dispatch) =>{
    dispatch({type:types.DELETE_LANGUAGE_REQUEST})
    try{
        const response = await DeleteLanguage(id,data, dispatch)
        console.log(response);
        const payload = response.data
        dispatch({type:types.DELETE_LANGUAGE_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.DELETE_LANGUAGE_FAILURE, error})
    }
}
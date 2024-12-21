import * as types from '../contants/actionTypes'
import {GetAllSliders,GetSlider,CreateSlider,UpdateSlider,DeleteSlider} from '../../../api/sliderApi'
import { addToast } from '../../toast/actions/toastAction'

export const getAllSliders = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_SLIDERS_REQUEST });
    try {
        const response = await GetAllSliders(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_ALL_SLIDERS_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_SLIDERS_FAILURE, error });
    }
}

export const getSlider = (id) => async (dispatch) => {
    dispatch({ type: types.GET_SLIDER_REQUEST });
    try {
        const response = await GetSlider(id, dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_SLIDER_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_SLIDER_FAILURE, error });
    }
}

export const createSlider = (data) =>async(dispatch) =>{    
    dispatch({type:types.CREATE_SLIDER_REQUEST})
    try{
        const response = await CreateSlider(data, dispatch)
        const payload = response.data
        dispatch({type:types.CREATE_SLIDER_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.CREATE_SLIDER_FAILURE, error})
    }
}

export const updateSlider = (id, data) =>async(dispatch) =>{
    dispatch({type:types.UPDATE_SLIDER_REQUEST})
    try{
        const response = await UpdateSlider(id, data, dispatch)
        const payload = response.data
        dispatch({type: types.UPDATE_SLIDER_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type: types.UPDATE_SLIDER_FAILURE , error})
    }
}


export const deleteSlider = (id) =>async(dispatch) =>{
    dispatch({type:types.DELETE_SLIDER_REQUEST})
    try{
        const response = await DeleteSlider(id, dispatch)
        console.log(response);
        const payload = response.data
        dispatch({type:types.DELETE_SLIDER_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.DELETE_SLIDER_FAILURE, error})
    }
}


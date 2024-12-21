import * as types from '../contants/actionTypes';
import {GetAllSupports,DeleteSupport,SovleSupport} from '../../../api/supportApi';
import {addToast} from '../../toast/actions/toastAction';


export const getAllSupports = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_SUPPORTS_REQUEST });
    try {
        const response = await GetAllSupports(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_ALL_SUPPORTS_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_SUPPORTS_FAILURE });
    }

}


export const deleteSupport = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_SUPPORT_REQUEST });
    try {
        const response = await DeleteSupport(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.DELETE_SUPPORT_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: types.DELETE_SUPPORT_FAILURE });
    }
}


export const solveSupport = (id) => async (dispatch) => {
    dispatch({ type: types.SOVLE_SUPPORT_REQUEST });
    try {
        const response = await SovleSupport(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.SOVLE_SUPPORT_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: types.SOVLE_SUPPORT_FAILURE });
    }
}



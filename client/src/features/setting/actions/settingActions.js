import * as types from '../contants/actionTypes'
import {GetAppSettings,GetAdsSettings,UpdateAppSettings,UpdateAdsSettings} from '../../../api/settingApi'
import { addToast } from '../../toast/actions/toastAction';

export const getAppSettings = () => async (dispatch) => {
    dispatch({ type: types.GET_APP_SETTINGS_REQUEST });
    try {
        const response = await GetAppSettings(dispatch);
        
        dispatch({ type: types.GET_APP_SETTINGS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_APP_SETTINGS_FAILURE });
    }

};

export const getAdsSettings = () => async (dispatch) => {
    dispatch({ type: types.GET_ADS_SETTINGS_REQUEST });
    try {
        const response = await GetAdsSettings(dispatch);
        
        dispatch({ type: types.GET_ADS_SETTINGS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_ADS_SETTINGS_FAILURE });
    }

}


export const updateAppSettings = (id,data) => async (dispatch) => {
    dispatch({ type: types.UPDATE_APP_SETTINGS_REQUEST });
    try {
        const response = await UpdateAppSettings(id,data,dispatch);
        dispatch({ type: types.UPDATE_APP_SETTINGS_SUCCESS, payload: response.data });
        dispatch(addToast('Updated successfully','success'))
    } catch (error) {
        dispatch({ type: types.UPDATE_APP_SETTINGS_FAILURE });
    }

}

export const updateAdsSettings = (id,data) => async (dispatch) => {

    dispatch({ type: types.UPDATE_ADS_SETTINGS_REQUEST });
    try {
        const response = await UpdateAdsSettings(id,data,dispatch);
        dispatch(addToast('Updated successfully', 'success'))
        dispatch({ type: types.UPDATE_ADS_SETTINGS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.UPDATE_ADS_SETTINGS_FAILURE });
    }

}
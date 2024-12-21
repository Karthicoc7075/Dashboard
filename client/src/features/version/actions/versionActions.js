import * as types from '../contants/actionTypes';
import { GetAllVersions,GetVersion,CreateVersion,UpdateVersion,DeleteVersion } from '../../../api/versionApi'
import { addToast } from '../../toast/actions/toastAction';

export const getAllVersions = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_VERSIONS_REQUEST });
    try {
        const response = await GetAllVersions(dispatch);
        const payload = response.data;

        console.log(response);
        dispatch({ type: types.GET_ALL_VERSIONS_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (err) {
        dispatch({ type: types.GET_ALL_VERSIONS_FAILURE });
    }
}

export const getVersion = (id) => async (dispatch) => {
    dispatch({ type: types.GET_VERSION_REQUEST });
    try {
        const response = await GetVersion(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_VERSION_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (err) {
        dispatch({ type: types.GET_VERSION_FAILURE });
    }
}

export const createVersion = (data) => async (dispatch) => {
    dispatch({ type: types.CREATE_VERSION_REQUEST });
    try {
        const response = await CreateVersion(data,dispatch);
        const payload = response.data;
        dispatch({ type: types.CREATE_VERSION_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (err) {
        dispatch({ type: types.CREATE_VERSION_FAILURE });
    }
}

export const updateVersion = (id,data) => async (dispatch) => {
    dispatch({ type: types.UPDATE_VERSION_REQUEST });
    try {
        const response = await UpdateVersion(id,data,dispatch);
        const payload = response.data;
        dispatch({ type: types.UPDATE_VERSION_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (err) {
        dispatch({ type: types.UPDATE_VERSION_FAILURE });
    }
}


export const deleteVersion = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_VERSION_REQUEST });
    try {
        const response = await DeleteVersion(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.DELETE_VERSION_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (err) {
        dispatch({ type: types.DELETE_VERSION_FAILURE });
    }
}
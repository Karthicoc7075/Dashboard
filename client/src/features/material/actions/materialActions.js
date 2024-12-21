import * as types from '../contants/actionTypes';
import { addToast } from '../../toast/actions/toastAction';
import { GetAllMaterials,GetMaterial,CreateMaterial,UpdateMaterial,DeleteMaterial,UpdateMaterialStatus } from '../../../api/materialApi';


export const getAllMaterials = (query, limit) => async (dispatch) => {
    dispatch({ type: types.GET_ALL_MATERIALS_REQUEST });
    try {
        const response = await GetAllMaterials(query, limit,dispatch);
        const payload ={data: response.data,totalCount: response.totalCount}
        dispatch({ type: types.GET_ALL_MATERIALS_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_MATERIALS_FAILURE, payload: error})
}
}

export const getMaterial = (id) => async (dispatch) => {
    dispatch({ type: types.GET_MATERIAL_REQUEST });
    try {
        const response = await GetMaterial(id,dispatch);
        const  payload= response.data
        dispatch({ type: types.GET_MATERIAL_SUCCESS,payload });
    } catch (error) {
        dispatch({ type: types.GET_MATERIAL_FAILURE, payload: error})
}
}

export const createMaterial = (formdata) => async (dispatch) => {
    dispatch({ type: types.CREATE_MATERIAL_REQUEST });
    try {
        const response = await CreateMaterial(formdata,dispatch);
        dispatch({ type: types.CREATE_MATERIAL_SUCCESS, payload: response.data});
        dispatch(addToast( response.message,'success'));
    } catch (error) {
        dispatch({ type: types.CREATE_MATERIAL_FAILURE, payload: error})
}
}


export const updateMaterial = (id, data) => async (dispatch) => {
    dispatch({ type: types.UPDATE_MATERIAL_REQUEST });
    try {
        const response = await UpdateMaterial(id, data,dispatch);
        dispatch({ type: types.UPDATE_MATERIAL_SUCCESS, payload: response.data});
        dispatch(addToast( response.message,'success'));
    } catch (error) {
        dispatch({ type: types.UPDATE_MATERIAL_FAILURE, payload: error})
}
}

export const deleteMaterial = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_MATERIAL_REQUEST });
    try {
        const response = await DeleteMaterial(id,dispatch);
        dispatch({ type: types.DELETE_MATERIAL_SUCCESS, payload: response.data});
        dispatch(addToast( response.message,'success'));
    } catch (error) {
        dispatch({ type: types.DELETE_MATERIAL_FAILURE, payload: error})
}
}

export const updateMaterialStatus = (id) => async (dispatch) => {
    dispatch({ type: types.UPDATE_MATERAL_STATUS_REQUEST });
    try {
        const response = await UpdateMaterialStatus(id,dispatch);
        dispatch({ type: types.UPDATE_MATERAL_STATUS_SUCCESS, payload: response.data});
        dispatch(addToast( response.message,'success'));
    } catch (error) {
        dispatch({ type: types.UPDATE_MATERAL_STATUS_FAILURE, payload: error})
}
}
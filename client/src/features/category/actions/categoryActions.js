import * as Types from '../contants/actionTypes';
import {GetAllCategories,GetCategory,CreateCategory,UpdateCategory,DeleteCategory } from '../../../api/categoryApi';
import {addToast} from '../../toast/actions/toastAction'
export const getAllCategories = () =>async(dispatch) => {
    dispatch({ type: Types.GET_ALL_CATEGORIES_REQUEST });
    try {
        const response = await GetAllCategories(dispatch);
        dispatch({ type: Types.GET_ALL_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: Types.GET_ALL_CATEGORIES_FAILURE, payload: error.message });
    }
}

export const getCategory = (categoryId) =>async(dispatch) => {
    dispatch({ type: Types.GET_CATEGORY_REQUEST });
    try {
        const response = await GetCategory(categoryId,dispatch);
        dispatch({ type: Types.GET_CATEGORY_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: Types.GET_CATEGORY_FAILURE, payload: error.message });
    }
}

export const createCategory = (category) =>async(dispatch) => {
    dispatch({ type: Types.CREATE_CATEGORY_REQUEST });
    try {
        const response = await CreateCategory(category,dispatch);
        dispatch({ type: Types.CREATE_CATEGORY_SUCCESS, payload: response.data });
        dispatch(addToast(response.message,'success'))
    } catch (error) {
        dispatch({ type: Types.CREATE_CATEGORY_FAILURE, payload: error.message });
    }
}

export const updateCategory = (categoryId,formData) =>async(dispatch) => {
    dispatch({ type: Types.UPDATE_CATEGORY_REQUEST });
    try {
        const response = await UpdateCategory(categoryId,formData,dispatch);
        dispatch({ type: Types.UPDATE_CATEGORY_SUCCESS, payload: response.data });
        dispatch(addToast(response.message,'success'))
    } catch (error) {
        dispatch({ type: Types.UPDATE_CATEGORY_FAILURE, payload: error.message });
    }
}


export const deleteCategory = (categoryId,data) =>async(dispatch) => {
    dispatch({ type: Types.DELETE_CATEGORY_REQUEST });
    try {
        const response = await DeleteCategory(categoryId,data,dispatch);
        dispatch({ type: Types.DELETE_CATEGORY_SUCCESS, payload: response.data });
        dispatch(addToast(response.message,'success'))
    } catch (error) {
        dispatch({ type: Types.DELETE_CATEGORY_FAILURE, payload: error.message });
    }
}




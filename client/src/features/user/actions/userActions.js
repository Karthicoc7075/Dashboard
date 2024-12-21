
import * as actionTypes from '../constants/actionTypes';
import { CreateUser,GetUsers, GetUser, EditUser, DeleteUser } from '../../../api/userApi';
import { addToast } from '../../toast/actions/toastAction';


export const getUsers = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_REQUEST });

    try {
        const response = await GetUsers(dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: actionTypes.GET_USERS_FAILURE, error });
    }
}

export const  createUser = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_USER_REQUEST });

    try {
        const response = await CreateUser(data, dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.CREATE_USER_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_USER_FAILURE, error });
    }
}

export const getUser = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST });

    try {
        const response = await GetUser(id, dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_FAILURE, error });
    }
}

export const editUser = (id, data) => async (dispatch) => {
    dispatch({ type: actionTypes.EDIT_USER_REQUEST });

    try {
        const response = await EditUser(id, data, dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.EDIT_USER_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: actionTypes.EDIT_USER_FAILURE, error });
    }
}

export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });

    try {
        const response = await DeleteUser(id, dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_USER_FAILURE, error });
    }
}

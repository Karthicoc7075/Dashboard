import * as types from '../contants/actionTypes'
import {GetAllNotifications,CreateNotification,DeleteNotification} from '../../../api/notificationApi'
import {addToast} from '../../toast/actions/toastAction'


export const getAllNotifications = () => async (dispatch) => {
    dispatch({type:types.GET_ALL_NOTIFICATIONS_REQUEST});
    try{
        const response = await GetAllNotifications(dispatch);
        const payload = response.data;
        dispatch({type:types.GET_ALL_NOTIFICATIONS_SUCCESS,payload});
    }
    catch(err){
        dispatch({type:types.GET_ALL_NOTIFICATIONS_FAILURE});
    }
}


export const createNotification = (data) => async (dispatch) => {
    dispatch({type:types.CREATE_NOTIFICATION_REQUEST});
    try{
        const response = await CreateNotification(data,dispatch);
        const payload = response.data;
        dispatch({type:types.CREATE_NOTIFICATION_SUCCESS,payload});
        dispatch(addToast(response.message,'success'))
    }
    catch(err){
        dispatch({type:types.CREATE_NOTIFICATION_FAILURE});
    }
}


export const deleteNotification = (id) => async (dispatch) => {
    dispatch({type:types.DELETE_NOTIFICATION_REQUEST});
    try{
        const response = await DeleteNotification(id,dispatch);
        const payload = response.data;
        dispatch({type:types.DELETE_NOTIFICATION_SUCCESS,payload});
        dispatch(addToast(response.message,'success'))
    }
    catch(err){
        dispatch({type:types.DELETE_NOTIFICATION_FAILURE});
    }
}

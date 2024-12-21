import * as actionTypes from '../constants/actionsTypes';
import {loginUser,PasswordChange} from '../../../api/authApi'
import {addToast} from '../../toast/actions/toastAction'

export const login = (username, password) =>async(dispatch) =>{
    dispatch({type:actionTypes.LOGIN_REQUEST})

    try{
        const response = await loginUser(username, password,dispatch)
        const payload = response.data
        dispatch({type:actionTypes.LOGIN_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        console.log(error);
        dispatch({type:actionTypes.LOGIN_FAILURE, error})
    }
}



export const passwordChange = (data) => async (dispatch) => {
    dispatch({ type: actionTypes.PASSWORD_CHANGE_REQUEST });

    try {
        const response = await PasswordChange(data, dispatch);
        const payload = response.data;
        dispatch({ type: actionTypes.PASSWORD_CHANGE_SUCCESS,  });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: actionTypes.PASSWORD_CHANGE_FAILURE, error });
    }
}

export const setRole = (role) =>(dispatch)=>{
    dispatch({type:actionTypes.SET_ROLE, role})

} 


export const logout = () => async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });

    try {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: actionTypes.LOGOUT_FAILURE, error });
    }
}
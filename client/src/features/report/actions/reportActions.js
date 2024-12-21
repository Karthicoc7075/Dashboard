import * as types from '../contants/actiontypes';
import {GetReports,SolveReport,DeleteReport} from '../../../api/reportApi';
import { addToast } from '../../toast/actions/toastAction';


export const getAllReports = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_REPORTS_REQUEST });
    try {
        const response = await GetReports(dispatch);
        
        const payload = response.data;
        dispatch({ type: types.GET_ALL_REPORTS_SUCCESS, payload });
    } catch (error) {
        dispatch({ type: types.GET_ALL_REPORTS_FAILURE, payload: error });
    }
}

export const solveReport = (id) => async (dispatch) => {
    dispatch({ type: types.SOLVE_REPORT_REQUEST });
    try {
        const response = await SolveReport(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.SOLVE_REPORT_SUCCESS, payload });
        dispatch(addToast(response.message,'success'))
    } catch (error) {
        console.log(error);
        dispatch({ type: types.SOLVE_REPORT_FAILURE, payload: error });
    }
}



export const deleteReport = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_REPORT_REQUEST });
    try {
        const response = await DeleteReport(id,dispatch);
        const payload = response.data;
        dispatch({ type: types.DELETE_REPORT_SUCCESS, payload });
        dispatch(addToast(response.message,'success'))
    } catch (error) {
        dispatch({ type: types.DELETE_REPORT_FAILURE, payload: error });
    }
}
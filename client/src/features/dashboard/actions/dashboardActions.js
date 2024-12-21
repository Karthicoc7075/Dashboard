import * as types from '../contants/actionTypes';
import { GetDashboardDatas } from '../../../api/dashboard';


export const getDashboardData = () =>async(dispatch) => {
    dispatch({ type: types.GET_DASHBOARD_DATAS_REQUEST });
     try{
        const response = await GetDashboardDatas(dispatch);
        const payload = response.data;
        dispatch({ type: types.GET_DASHBOARD_DATAS_SUCCESS, payload });
     }
        catch(error){
            dispatch({ type: types.GET_DASHBOARD_DATAS_FAILURE, payload: error.message });
        }
}
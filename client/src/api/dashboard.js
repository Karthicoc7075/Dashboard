import axiosInstance from "./axiosConfig";
import { addToast } from "../features/toast/actions/toastAction";

export const GetDashboardDatas = async (dispatch) => {
            try{
                const response = await axiosInstance.get(`/dashboard/`);
                return response.data;
            }
            catch(error){
                dispatch(addToast(error.response?.data?.message || error.message, 'error'));
            }
}
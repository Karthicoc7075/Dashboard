import * as Types from '../contants/actionTypes';
import { GetAllNews,GetNews,CreateNews,UpdateNews,DeleteNews,UpdateNewsStatus } from '../../../api/newsApi';
import { addToast } from '../../toast/actions/toastAction';

export const getAllNews = () => async (dispatch) => {
    dispatch({ type: Types.GET_ALL_NEWS_REQUEST });
   try {
         const response = await GetAllNews(dispatch);
        const payload= response.data
         dispatch({ type: Types.GET_ALL_NEWS_SUCCESS, payload });
   }catch(err){
       dispatch({ type: Types.GET_ALL_NEWS_FAILURE, payload: err });
   }
}

export const getNews = (id) => async (dispatch) => {
    dispatch({ type: Types.GET_NEWS_REQUEST });
   try {
         const response = await GetNews(id,dispatch);
        const payload= response.data
         dispatch({ type: Types.GET_NEWS_SUCCESS, payload });
   }catch(err){
       dispatch({ type: Types.GET_NEWS_FAILURE, payload: err });
   }
}

export const createNews = (data) => async (dispatch) => {
    dispatch({ type: Types.CREATE_NEWS_REQUEST });
   try {
         const response = await CreateNews(data,dispatch);
        const payload= response.data
         dispatch({ type: Types.CREATE_NEWS_SUCCESS, payload });
         dispatch(addToast(response.message,'success'))
   }catch(err){
       dispatch({ type: Types.CREATE_NEWS_FAILURE, payload: err });
   }
}

export const updateNews = (id,data) => async (dispatch) => {
    dispatch({ type: Types.UPDATE_NEWS_REQUEST });
   try {
         const response = await UpdateNews(id,data,dispatch);
        const payload= response.data
         dispatch({ type: Types.UPDATE_NEWS_SUCCESS, payload });
         dispatch(addToast(response.message,'success'))
   }catch(err){
       dispatch({ type: Types.UPDATE_NEWS_FAILURE, payload: err });
   }
}

export const deleteNews = (id) => async (dispatch) => {
    dispatch({ type: Types.DELETE_NEWS_REQUEST });
   try {
         const response = await DeleteNews(id,dispatch);
        const payload= response.data
         dispatch({ type: Types.DELETE_NEWS_SUCCESS, payload });
            dispatch(addToast(response.message,'success'))
   }catch(err){
       dispatch({ type: Types.DELETE_NEWS_FAILURE, payload: err });
   }
}


export const updateNewsStatus = (id) => async (dispatch) => {
    dispatch({ type: Types.UPDATE_NEWS_STATUS_REQUEST });
   try {
         const response = await UpdateNewsStatus(id,dispatch);
        const payload= response.data
         dispatch({ type: Types.UPDATE_NEWS_STATUS_SUCCESS, payload });
        dispatch(addToast(response.message,'success'))
   }catch(err){
       dispatch({ type: Types.UPDATE_NEWS_STATUS_FAILURE, payload: err });
   }
}


export const clearNews = () => async (dispatch) => {
    dispatch({ type: Types.CLEAR_NEWS });
}

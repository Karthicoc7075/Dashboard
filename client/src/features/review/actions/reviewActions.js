import * as types from  '../contants/actionTypes'
import { GetAllReviews,DeleteReview } from '../../../api/reviewApi'
import { addToast } from '../../toast/actions/toastAction'

export const getAllReviews =()=>async(dispatch)=>{
    dispatch({type:types.GET_ALL_REVIEWS_REQUEST})
    try {
        const response = await GetAllReviews(dispatch)
        const payload = response.data
        dispatch({type:types.GET_ALL_REVIEWS_SUCCESS,payload})
    } catch (error) {
        dispatch({type:types.GET_ALL_REVIEWS_FAILURE})
    }
}

export const deleteReview =(id)=>async(dispatch)=>{
    dispatch({type:types.DELETE_REVIEW_REQUEST})
    try {
        const response = await DeleteReview(id,dispatch)
        const payload = response.data
        dispatch({type:types.DELETE_REVIEW_SUCCESS,payload})
        dispatch(addToast('Review Deleted Successfully','success'))
    } catch (error) {
        dispatch({type:types.DELETE_REVIEW_FAILURE})
        dispatch(addToast('Failed to delete review','error'))
    }
}
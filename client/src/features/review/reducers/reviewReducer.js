import * as types from '../contants/actionTypes';


const initialState = {
    reviews: [],
    loading: false,
    deleteLoading: false,
    error: null
}


const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: action.payload,
                loading: false
            }
        case types.GET_ALL_REVIEWS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case types.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case types.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: state.reviews.filter(review => review._id != action.payload._id),
                deleteLoading: false
            }
        case types.DELETE_REVIEW_FAILURE:
            return {
                ...state,
                deleteLoading: false
            }
        default:
            return state
    }
}

export default reviewReducer;
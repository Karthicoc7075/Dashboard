import * as types from '../contants/actionTypes';

const initialState = {
    supports: [],
    loading: false,
    deleteLoading: false,
    solveLoading: false,
    error: ''
};

const supportReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_SUPPORTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_SUPPORTS_SUCCESS:
            return {
                ...state,
                supports: action.payload,
                loading: false
            }
        case types.GET_ALL_SUPPORTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.DELETE_SUPPORT_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case types.DELETE_SUPPORT_SUCCESS:
            return {
                ...state,
                supports: state.supports.filter(item => item._id != action.payload._id),
                deleteLoading: false
            }
        case types.DELETE_SUPPORT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.payload
            }
        case types.SOVLE_SUPPORT_REQUEST:
            return {
                ...state,
                solveLoading: true
            }
        case types.SOVLE_SUPPORT_SUCCESS:
            return {
                ...state,
                supports: state.supports.filter(item => item._id != action.payload._id),
                solveLoading: false
            }
        case types.SOVLE_SUPPORT_FAILURE:
            return {
                ...state,
                solveLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export default supportReducer;
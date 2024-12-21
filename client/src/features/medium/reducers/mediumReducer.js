import * as types from '../contants/actionTypes';


const initialState = {
    mediums: [],
    medium: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
}

const mediumReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_ALL_MEDIUMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_MEDIUMS_SUCCESS:
            return {
                ...state,
                mediums: action.payload,
                loading: false
            }
        case types.GET_ALL_MEDIUMS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case types.GET_MEDIUM_REQUEST:
            return {
                ...state,
                getLoading: true
            }
        case types.GET_MEDIUM_SUCCESS:
            return {
                ...state,
                medium: action.payload,
                getLoading: false
            }
        case types.GET_MEDIUM_FAILURE:
            return {
                ...state,
                error: action.payload,
                getLoading: false
            }
        case types.CREATE_MEDIUM_REQUEST:
            return {
                ...state,
                createLoading: true
            }
        case types.CREATE_MEDIUM_SUCCESS:
            return {
                ...state,
                mediums: [...state.mediums, action.payload],
                createLoading: false
            }
        case types.CREATE_MEDIUM_FAILURE:
            return {
                ...state,
                error: action.payload,
                createLoading: false
            }
        case types.UPDATE_MEDIUM_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case types.UPDATE_MEDIUM_SUCCESS:
            return {
                ...state,
                mediums: state.mediums.map(material => material._id === action.payload._id ? action.payload : material),
                updateLoading: false
            }
        case types.UPDATE_MEDIUM_FAILURE:
            return {
                ...state,
                error: action.payload,
                updateLoading: false
            }
        case types.DELETE_MEDIUM_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case types.DELETE_MEDIUM_SUCCESS:
            return {
                ...state,
                mediums: state.mediums.filter(material => material._id !== action.payload._id),
                deleteLoading: false
            }
        case types.DELETE_MEDIUM_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: false
            }
        default:
            return state;
    }
}


export default mediumReducer;
import * as Types from '../contants/actionTypes';

const initialState = {
    newsList: [],
    news:null,
    loading: false,
    updateLoading:false,
    deleteLoading:false,
    error: null
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ALL_NEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.GET_ALL_NEWS_SUCCESS:
            return {
                ...state,
                newsList: action.payload,
                loading: false
            }
        case Types.GET_ALL_NEWS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case Types.GET_NEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.GET_NEWS_SUCCESS:
            return {
                ...state,
                news: action.payload,
                loading: false
            }
        case Types.GET_NEWS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case Types.CREATE_NEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.CREATE_NEWS_SUCCESS:
            return {
                ...state,
                newsList: [action.payload, ...state.newsList],
                loading: false
            }
        case Types.CREATE_NEWS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case Types.UPDATE_NEWS_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case Types.UPDATE_NEWS_SUCCESS:
            return {
                ...state,
                newsList: state.newsList.map(item => item._id === action.payload._id ? action.payload : item),
                updateLoading: false
            }
        case Types.UPDATE_NEWS_FAILURE:
            return {
                ...state,
                error: action.payload,
                updateLoading: false
            }
        case Types.DELETE_NEWS_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case Types.DELETE_NEWS_SUCCESS:
            return {
                ...state,
                newsList: state.newsList.filter(item => item._id !== action.payload._id),
                deleteLoading: false
            }
        case Types.DELETE_NEWS_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: false
            }
        case Types.UPDATE_NEWS_STATUS_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case Types.UPDATE_NEWS_STATUS_SUCCESS:
            return {
                ...state,
                newsList: state.newsList.map(item => item._id === action.payload._id ? action.payload : item),
                updateLoading: false
            }
        case Types.UPDATE_NEWS_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload,
                updateLoading: false
            }
        case Types.CLEAR_NEWS:
            return {
                ...state,
                news: null
            }
        default:
            return state;
    }
}

export default newsReducer;
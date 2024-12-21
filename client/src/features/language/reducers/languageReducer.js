import * as types from '../contants/actionTypes';


const initialState = {
    languages: [],
    language: {},
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
}

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_LANGUAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.GET_ALL_LANGUAGES_SUCCESS:
            return {
                ...state,
                languages: action.payload,
                loading: false,
            }
        case types.GET_ALL_LANGUAGES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case types.GET_LANGUAGE_REQUEST:
            return {
                ...state,
               getLoading: true,
            }
        case types.GET_LANGUAGE_SUCCESS:
            return {
                ...state,
                language: action.payload,
                getLoading: false,
            }
        case types.GET_LANGUAGE_FAILURE:
            return {
                ...state,
                error: action.error,
                getLoading: false,
            }
        case types.CREATE_LANGUAGE_REQUEST:
            return {
                ...state,
               createLoading: true,
            }
        case types.CREATE_LANGUAGE_SUCCESS:
            return {
                ...state,
                languages: [action.payload,...state.languages],
                createLoading: false
            }
        case types.CREATE_LANGUAGE_FAILURE:
            return {
                ...state,
                error: action.error,
                createLoading: false,
            }
        case types.UPDATE_LANGUAGE_REQUEST:
            return {
                ...state,
                updateLoading: true,
            }
        case types.UPDATE_LANGUAGE_SUCCESS:
            return {
                ...state,
                languages: state.languages.map(language => language._id === action.payload._id ? action.payload : language),
                updateLoading: false,
            }
        case types.UPDATE_LANGUAGE_FAILURE:
            return {
                ...state,
                error: action.error,
                updateLoading: false,
            }
        case types.DELETE_LANGUAGE_REQUEST:
            return {
                ...state,
                deleteLoading: true,
            }
        case types.DELETE_LANGUAGE_SUCCESS:
            return {
                ...state,
                languages: state.languages.filter(language => language._id != action.payload._id),
                deleteLoading: false,
            }
        case types.DELETE_LANGUAGE_FAILURE:
            return {
                ...state,
                error: action.error,
                deleteLoading: false,
            }
        default:
            return state;


    }

}

export default languageReducer;
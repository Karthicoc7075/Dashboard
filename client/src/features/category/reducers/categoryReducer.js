import * as types from '../contants/actionTypes';

const initialState = {
    categories: [],
    category: {},
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case types.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case types.GET_CATEGORY_REQUEST:
            return {
                ...state,
                getLoading:true
            };
        case types.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                getLoading: false
            };
        case types.GET_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                getLoading: false
            };
        case types.CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                createLoading: true
            };
        case types.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [action.payload,...state.categories],
                createLoading: false
            };
        case types.CREATE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                createLoading: false
            };
        case types.UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                updateLoading: true
            };
        case types.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((category) => category._id === action.payload._id ? action.payload : category),
                updateLoading: false
            };
        case types.UPDATE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                updateLoading: false
            };
        case types.DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                deleteLoading: true
            };
        case types.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter((category) => category._id != action.payload._id),
                deleteLoading: false
            };

        case types.DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: false
            };

        default:
            return state;

    }

}

export default categoryReducer;
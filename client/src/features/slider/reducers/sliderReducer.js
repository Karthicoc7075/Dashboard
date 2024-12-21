import * as types from '../contants/actionTypes';

const initialState = {
    sliders: [],
    slider: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
};


const sliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_SLIDERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_ALL_SLIDERS_SUCCESS:
            return {
                ...state,
                sliders: action.payload,
                loading: false
            };
        case types.GET_ALL_SLIDERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case types.GET_SLIDER_REQUEST:
            return {
                ...state,
                getLoading: true
            };
        case types.GET_SLIDER_SUCCESS:
            return {
                ...state,
                slider: action.payload,
                getLoading: false
            };
        case types.GET_SLIDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                getLoading: false
            };
        case types.CREATE_SLIDER_REQUEST:
            return {
                ...state,
               createLoading: true
            };
        case types.CREATE_SLIDER_SUCCESS:
            return {
                ...state,
                sliders: [action.payload,...state.sliders],
                createLoading: false
            };
        case types.CREATE_SLIDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                createLoading: false
            };
        case types.UPDATE_SLIDER_REQUEST:
            return {
                ...state,
                updateLoading: true
            };
        case types.UPDATE_SLIDER_SUCCESS:
            return {
                ...state,
                sliders: state.sliders.map((slider) => slider._id === action.payload._id ? action.payload : slider),
                updateLoading: false
            };
        case types.UPDATE_SLIDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                updateLoading: false
            };
        case types.DELETE_SLIDER_REQUEST:
            return {
                ...state,
                deleteLoading: true
            };
        case types.DELETE_SLIDER_SUCCESS:
            return {
                ...state,
                sliders: state.sliders.filter((slider) => slider._id != action.payload._id),
                deleteLoading: false
            };
        case types.DELETE_SLIDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: false
            };
        default:
            return state;
    }
}


export default sliderReducer;

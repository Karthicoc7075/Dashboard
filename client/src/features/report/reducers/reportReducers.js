import * as types from '../contants/actiontypes';


const initialState = {
    reports: [],
    loading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_REPORTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_ALL_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: action.payload
            };
        case types.GET_ALL_REPORTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.SOLVE_REPORT_REQUEST:
            return {
                ...state,
                updateLoading: true
            };
        case types.SOLVE_REPORT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                reports: state.reports.filter(report => report._id != action.payload._id)
            };
        case types.SOLVE_REPORT_FAILURE:    
            return {
                ...state,
                updateLoading: false,
                error: action.payload
            };
        case types.DELETE_REPORT_REQUEST:
            return {
                ...state,
                deleteLoading: true
            };
        case types.DELETE_REPORT_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                reports: state.reports.filter(report => report._id != action.payload._id)
            };
        case types.DELETE_REPORT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default reportReducer;

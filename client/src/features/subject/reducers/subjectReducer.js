import * as types from '../contants/actionsTypes';

const initialState = {
    subjects: [],
    subject: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
    };



const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_SUBJECTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_SUBJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                subjects: action.payload
            }
        case types.GET_ALL_SUBJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.GET_SUBJECT_REQUEST:
            return {
                ...state,
                getLoading: true
            }
        case types.GET_SUBJECT_SUCCESS:
            return {
                ...state,
                getLoading: false,
                subject: action.payload
            }
        case types.GET_SUBJECT_FAILURE:
            return {
                ...state,
                getLoading: false,
                error: action.error
            }
        case types.CREATE_SUBJECT_REQUEST:
            return {
                ...state,
                createLoading: true
            }
        case types.CREATE_SUBJECT_SUCCESS:
            return {
                ...state,
                createLoading: false,
                subjects: [action.payload,...state.subjects]
            }
        case types.CREATE_SUBJECT_FAILURE:
            return {
                ...state,
                createLoading: false,
                error: action.error
            }
        case types.UPDATE_SUBJECT_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case types.UPDATE_SUBJECT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                subjects: state.subjects.map(subject => subject._id == action.payload._id ? action.payload : subject)
            }
        case types.UPDATE_SUBJECT_FAILURE:
            return {
                ...state,
                updateLoading: false,
                error: action.error
            }
        case types.DELETE_SUBJECT_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case types.DELETE_SUBJECT_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                subjects: state.subjects.filter(subject => subject._id != action.payload._id)
            }
        case types.DELETE_SUBJECT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default subjectReducer;
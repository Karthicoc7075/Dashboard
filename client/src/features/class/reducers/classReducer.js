import { act } from 'react';
import * as types from '../contants/actionsTypes';

const initialState = {
    classes: [],
    class: null,
    classSubjects:[],
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: '',
};

const classReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_ALL_CLASSES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.GET_ALL_CLASSES_SUCCESS:
            return {
                ...state,
                classes: action.payload,
                loading: false,
                error: '',
            };
        case types.GET_ALL_CLASSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case types.GET_CLASS_REQUEST:
            return {
                ...state,
                getLoading: true,
            };
        case types.GET_CLASS_SUCCESS:
            return {
                ...state,
                class: action.payload,
                getLoading: false,
                error: '',
            };
        case types.GET_CLASS_FAILURE:
            return {
                ...state,
                getLoading: false,
                error: action.error,
            };
        case types.CREATE_CLASS_REQUEST:
            return {
                ...state,
                createLoading: true,
            };
        case types.CREATE_CLASS_SUCCESS:
            return {
                ...state,
                createLoading: false,
                classes: [action.payload,...state.classes],
                error: '',
            };
        case types.CREATE_CLASS_FAILURE:
            return {
                ...state,
                createLoading: false,
                error: action.error,
            };
        case types.UPDATE_CLASS_REQUEST:
            return {
                ...state,
                updateLoading: true,
            };
        case types.UPDATE_CLASS_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                classes: state.classes.map((item) => item._id == action.payload._id ? action.payload : item),
                error: '',
            };
        case types.UPDATE_CLASS_FAILURE:
            return {
                ...state,
                updateLoading: false,
                error: action.error,
            };
        case types.DELETE_CLASS_REQUEST:
            return {
                ...state,
                deleteLoading: true,
            };
        case types.DELETE_CLASS_SUCCESS:
            return {
                ...state,
                classes: state.classes.filter((item) => item._id != action.payload._id),
                deleteLoading: false,
                error: '',
            };
        case types.DELETE_CLASS_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.error,
            };

        case types.GET_CLASS_SUBJECT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.GET_CLASS_SUBJECT_SUCCESS:
            return {
                ...state,
               class: state.classes.find((item) => item._id == action.classId),
               classSubjects: action.payload,
                loading: false,
                error: '',
            }
        case types.GET_CLASS_SUBJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case types.CREATE_CLASS_SUBJECT_REQUEST:
            return {
                ...state,
                createLoading: true,
            };
        case types.CREATE_CLASS_SUBJECT_SUCCESS:
            return {
                ...state,
                createLoading: false,
                classSubjects: [...state.classSubjects, action.payload],
                error: '',
            };
        case types.CREATE_CLASS_SUBJECT_FAILURE:
            return {
                ...state,
                createLoading: false,
                error: action.error,
            };
        case types.DELETE_CLASS_SUBJECT_REQUEST:
            return {
                ...state,
                deleteLoading: true,
            };
        case types.DELETE_CLASS_SUBJECT_SUCCESS:
            return {
                ...state,
                classSubjects: state.classSubjects.filter((item) => item._id != action.payload._id),
                deleteLoading: false,
                error: '',
            };
        case types.DELETE_CLASS_SUBJECT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.error,
            };
        
        default:
            return state;

        }


}

export default classReducer;
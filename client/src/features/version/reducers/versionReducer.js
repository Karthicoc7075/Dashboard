import * as types from '../contants/actionTypes';

const initialState = {
    versions: [],
    version: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
};

const versionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_VERSIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_VERSIONS_SUCCESS:
            return {
                ...state,
                versions: action.payload,
                loading: false
            }
        case types.GET_ALL_VERSIONS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case types.GET_VERSION_REQUEST:
            return {
                ...state,
                getLoading: true
            }
        case types.GET_VERSION_SUCCESS:
            return {
                ...state,
                version: action.payload,
                getLoading: false
            }
        case types.GET_VERSION_FAILURE:
            return {
                ...state,
                getLoading: false
            }
        case types.CREATE_VERSION_REQUEST:
            return {
                ...state,
                createLoading: true
            }
        case types.CREATE_VERSION_SUCCESS:
            return {
                ...state,
                versions: [action.payload,...state.versions],
                createLoading: false
            }
        case types.CREATE_VERSION_FAILURE:
            return {
                ...state,
                createLoading: false
            }
        case types.UPDATE_VERSION_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case types.UPDATE_VERSION_SUCCESS:
            return {
                ...state,
                versions: state.versions.map(version => version._id == action.payload._id ? action.payload : version),
                updateLoading: false
            }
        case types.UPDATE_VERSION_FAILURE:
            return {
                ...state,
                updateLoading: false
            }
        case types.DELETE_VERSION_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case types.DELETE_VERSION_SUCCESS:
            return {
                ...state,
                versions: state.versions.filter(version => version._id != action.payload._id),
                deleteLoading: false
            }
        case types.DELETE_VERSION_FAILURE:
            return {
                ...state,
                deleteLoading: false
            }
        default:
            return state;
    }
}


export default versionReducer;
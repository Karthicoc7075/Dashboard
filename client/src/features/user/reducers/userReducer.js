import * as actionTypes from '../constants/actionTypes';  


const initialState = {
    users:[],
    user:null,
    error:'',
    loading:false,
    getLoading:false,
    createLoading:false,
    deleteLoading:false,
    updateLoading:false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case actionTypes.GET_USERS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
            
        case actionTypes.CREATE_USER_REQUEST:
            return {
                ...state,
                createLoading: true
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload],
                createLoading: false
            }
        case actionTypes.CREATE_USER_FAILURE:
            return {
                ...state,
                error: action.error,
                createLoading: false
            }
        case actionTypes.GET_USER_REQUEST:
            return {
                ...state,
                getLoading: true
            }
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                getLoading: false
            }
        case actionTypes.GET_USER_FAILURE:
            return {
                ...state,
                error: action.error,
                getLoading: false
            }
        case actionTypes.EDIT_USER_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => user._id == action.payload._id ? action.payload : user),
                updateLoading: false
            }
        case actionTypes.EDIT_USER_FAILURE:
            return {
                ...state,
                error: action.error,
                updateLoading: false
            }
        case actionTypes.DELETE_USER_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user._id != action.payload._id),
                deleteLoading: false
            }
        case actionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                error: action.error,
                deleteLoading: false
            }
        default:
            return state
    }
}

export default userReducer;
import * as actionTypes from '../constants/actionsTypes'

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    updateLoading: false,
    role: 'user',
    error: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
            case actionTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload.auth,
                    token: action.payload.token,
                    loading: false,
                    error: '',
                };
            case actionTypes.LOGIN_FAILURE:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    loading: false,
                    error: action.payload,
                };

            case actionTypes.LOGOUT_REQUEST:
                return {
                    ...state,
                    loading: true,
                };

            case actionTypes.LOGOUT_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case actionTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    loading: false,
                    error: '',
                };
            case actionTypes.SET_ROLE:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        role: action.role,
                    },
                };
        case actionTypes.PASSWORD_CHANGE_REQUEST:
            return {
                ...state,
                updateLoading: true,
            };
        case actionTypes.PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
            };

        case actionTypes.PASSWORD_CHANGE_FAILURE:
            return {
                ...state,
                updateLoading: false,
                error: action.payload,
            };
            
      
        default:
            return state;
    }
};

export default authReducer;
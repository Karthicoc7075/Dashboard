import * as types from '../contants/actionTypes'


const initialState = {
    appSettings: {
        data: [],
        loading: false,
        updateLoading: false,
        error: false
    },
    adsSettings: {
        data: [],
        loading: false,
        updateLoading: false,
        error: false
    }
}


const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_APP_SETTINGS_REQUEST:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    loading: true
                }
            }
        case types.GET_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    data: action.payload,
                    loading: false
                }
            }
        case types.GET_APP_SETTINGS_FAILURE:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    loading: false,
                    error: true
                }
            }
        case types.UPDATE_APP_SETTINGS_REQUEST:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    updateLoading: true
                }
            }
        case types.UPDATE_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    data: action.payload,
                    updateLoading: false
                }
            }
        case types.UPDATE_APP_SETTINGS_FAILURE:
            return {
                ...state,
                appSettings: {
                    ...state.appSettings,
                    updateLoading: false
                }
            }
        case types.GET_ADS_SETTINGS_REQUEST:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    loading: true
                }
            }
        case types.GET_ADS_SETTINGS_SUCCESS:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    data: action.payload,
                    loading: false
                }
            }
        case types.GET_ADS_SETTINGS_FAILURE:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    loading: false,
                    error: true
                }
            }
        case types.UPDATE_ADS_SETTINGS_REQUEST:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    updateLoading: true
                }
            }
        case types.UPDATE_ADS_SETTINGS_SUCCESS:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    data: action.payload,
                    updateLoading: false
                }
            }
        case types.UPDATE_ADS_SETTINGS_FAILURE:
            return {
                ...state,
                adsSettings: {
                    ...state.adsSettings,
                    updateLoading: false
                }
            }
        default:
            return state
    }
}


export default settingReducer;
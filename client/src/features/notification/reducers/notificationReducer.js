import * as types from '../contants/actionTypes'

const initialState = {
    notifications:[],
    loading:false,
    createLoading:false,
    deleteLoading:false,
    error:false
}


const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case types.GET_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading:false,
                notifications:action.payload
            }
        case types.GET_ALL_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading:false,
                error:true
            }
        case types.CREATE_NOTIFICATION_REQUEST:
            return {
                ...state,
                createLoading:true
            }
        case types.CREATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                createLoading:false,
                notifications:[action.payload,...state.notifications]
            }
        case types.CREATE_NOTIFICATION_FAILURE:
            return {
                ...state,
                createLoading:false,
                error:true
            }
        case types.DELETE_NOTIFICATION_REQUEST:
            return {
                ...state,
                deleteLoading:true
            }
        case types.DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                deleteLoading:false,
                notifications:state.notifications.filter(item => item._id != action.payload._id)
            }
        case types.DELETE_NOTIFICATION_FAILURE:
            return {
                ...state,
                deleteLoading:false,
                error:true
            }
        default:
            return state
    }
}


export default notificationReducer
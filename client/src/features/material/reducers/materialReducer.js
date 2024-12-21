import * as types from '../contants/actionTypes';


const initialState = {
    materials: [],
    material: null,
    totalMaterialCount: 0,
    loading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null
}

const materialReducer = (state = initialState, action) => {
        switch(action.type) {
            case types.GET_ALL_MATERIALS_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            case types.GET_ALL_MATERIALS_SUCCESS:
                return {
                    ...state,
                    materials: action.payload.data,
                    totalMaterialCount: action.payload.totalCount,
                    loading: false
                }
            case types.GET_ALL_MATERIALS_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            case types.GET_MATERIAL_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            case types.GET_MATERIAL_SUCCESS:
                return {
                    ...state,
                    material: action.payload,
                    loading: false
                }
            case types.GET_MATERIAL_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            case types.CREATE_MATERIAL_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            case types.CREATE_MATERIAL_SUCCESS:
                return {
                    ...state,
                    materials: [action.payload,...state.materials],
                    totalCount: state.totalMaterialCount + 1,
                    loading: false
                }
            case types.CREATE_MATERIAL_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            case types.UPDATE_MATERIAL_REQUEST:
                return {
                    ...state,
                    updateLoading: true
                }
            case types.UPDATE_MATERIAL_SUCCESS:
                return {
                    ...state,
                    materials: state.materials.map(material => material._id === action.payload._id ? action.payload : material),
                    updateLoading: false
                }
            case types.UPDATE_MATERIAL_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    updateLoading: false
                }
            case types.DELETE_MATERIAL_REQUEST:
                return {
                    ...state,
                    deleteLoading: true
                }
            case types.DELETE_MATERIAL_SUCCESS:
                return {
                    ...state,
                    materials: state.materials.filter(material => material._id !== action.payload._id),
                    totalMaterialCount: state.totalMaterialCount - 1,
                    deleteLoading: false
                }
            case types.DELETE_MATERIAL_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    deleteLoading: false
                }

            case types.UPDATE_MATERAL_STATUS_REQUEST:
                return {
                    ...state,
                    updateLoading: true
                }
            case types.UPDATE_MATERAL_STATUS_SUCCESS:
                return {
                    ...state,
                    materials: state.materials.map(material => material._id === action.payload._id ? action.payload : material),
                    updateLoading: false
                }
            case types.UPDATE_MATERAL_STATUS_FAILURE:
                return {
                    ...state,
                    error: action.payload,
                    updateLoading: false
                }
            default:
                return state;
        }   

}

export default materialReducer;
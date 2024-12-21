import * as themeTypes from '../constants/actionTypes';


    const initialState = {
        theme: 'system'
        
    }

const themeReducers = (state=initialState, action) => {
    switch (action.type) {
        case themeTypes.SET_THEME_MODE:
            return {
                ...state,
                theme: action.payload
            }
            
        default:
            return state;
    }
}

export default themeReducers;
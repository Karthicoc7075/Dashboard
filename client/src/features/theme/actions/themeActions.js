import * as themeTypes from '../constants/actionTypes';

export const setTheme = (theme) => dispatch=>{
    dispatch({
        type: themeTypes.SET_THEME_MODE,
        payload: theme
    })
}
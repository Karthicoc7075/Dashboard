

import { ADD_TOAST,REMOVE_TOAST } from '../actions/toastAction';

const initialState = {
   toasts:[]
};

const toastReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TOAST:
        return {
          ...state,
          toasts: [...state.toasts, action.payload]
        };
      case REMOVE_TOAST:
        return {
          ...state,
          toasts: state.toasts.filter(toast => toast.id !== action.payload)
        };
      default:
        return state;
    }
};

export default toastReducer;

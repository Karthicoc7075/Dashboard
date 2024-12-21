// src/features/toast/actions/toastActions.js

export const ADD_TOAST = "ADD_TOAST"
export const REMOVE_TOAST = "REMOVE_TOAST"

export const addToast = (message, type) => ({
    type: ADD_TOAST,
    payload: { message, type, id: Date.now() }
  });
  
  export const removeToast = (id) => ({
    type: REMOVE_TOAST,
    payload: id
  });
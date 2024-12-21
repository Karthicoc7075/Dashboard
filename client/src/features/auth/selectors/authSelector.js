export const getAuthSelector = (state) => state.auth;
export const getRoleSelector = (state) => state.auth.role; 
export const loadingSelector = (state) => state.auth.loading;
export const updateLoadingSelector = (state) => state.auth.updateLoading;


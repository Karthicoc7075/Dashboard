export const getUsersSelector = state => state.user.users;
export const getUserSelector = state => state.user.user;
export const loadingSelector = state => state.user.loading;
export const createLoadingSelector = state => state.user.createLoading;
export const getLoadingSelector = state => state.user.getLoading;
export const updateLoadingSelector = state => state.user.updateLoading;
export const deleteLoadingSelector = state => state.user.deleteLoading;
export const errorSelector = state => state.user.error;

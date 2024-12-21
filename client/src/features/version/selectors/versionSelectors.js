export const getAllVersionSelector = (state) => state.version.versions;
export const getVersionSelector = (state) => state.version.version;
export const loadingSelector = (state) => state.version.loading;
export const createLoadingSelector = (state) => state.version.createLoading;
export const getLoadingSelector = (state) => state.version.getLoading;
export const updateLoadingSelector = (state) => state.version.updateLoading;
export const deleteLoadingSelector = (state) => state.version.deleteLoading;
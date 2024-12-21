export const getAllNewsSelector = (state) => state.news.newsList;
export const getNewsSelector = (state) => state.news.news;
export const loadingSelector = (state) => state.news.loading;
export const updateLoadingSelector = (state) => state.news.updateLoading;
export const deleteLoadingSelector = (state) => state.news.deleteLoading;
export const getAllNotificationSelector = (state) => state.notification.notifications;
export const loadingSelector = (state) => state.notification.loading;
export const createLoadingSelector = (state) => state.notification.createLoading;
export const deleteLoadingSelector = (state) => state.notification.deleteLoading;
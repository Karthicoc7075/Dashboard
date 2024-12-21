export const getAdsSettingsSelector = (state) => state.setting.adsSettings.data;
export const getAppSettingsSelector = (state) => state.setting.appSettings.data;
export const getAdsSettingsLoadingSelector = (state) => state.setting.adsSettings.loading;
export const getAppSettingsLoadingSelector = (state) => state.setting.appSettings.loading;  
export const updateAppSettingsLoadingSelector = (state) => state.setting.appSettings.updateLoading;
export const updateAdsSettingsLoadingSelector = (state) => state.setting.adsSettings.updateLoading;
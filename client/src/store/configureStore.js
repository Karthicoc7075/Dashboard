import { createStore , applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { loadState, saveState } from '../utils/localStorage'
import  {composeWithDevTools} from '@redux-devtools/extension'
import authReducer from '../features/auth/reducers/authReducer'
import dashboardReducer from '../features/dashboard/reducers/dashboardReducer';
import classReducer from '../features/class/reducers/classReducer';
import subjectReducer from '../features/subject/reducers/subjectReducer';
import materialReducer from '../features/material/reducers/materialReducer';
import mediumReducer from '../features/medium/reducers/mediumReducer';
import categoryReducer from '../features/category/reducers/categoryReducer';
import languageReducer from '../features/language/reducers/languageReducer';
import sliderReducer from '../features/slider/reducers/sliderReducer';
import reviewReducer from '../features/review/reducers/reviewReducer';
import reportReducer from '../features/report/reducers/reportReducers';
import supportReducer from '../features/support/reducers/supportReducer';
import notificationReducer from '../features/notification/reducers/notificationReducer';
import versionReducer from '../features/version/reducers/versionReducer';
import settingReducer from '../features/setting/reducers/settingReducer';
import userReducer from '../features/user/reducers/userReducer';
import newsReducer from '../features/news/reducers/newsReducer';
import toastReducer from '../features/toast/reducers/toasterReducer';
import themeReducers from '../features/theme/reducers/themeReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    class: classReducer,
    subject: subjectReducer,
    material: materialReducer,
    medium: mediumReducer,
    category: categoryReducer,
    language: languageReducer,
    slider: sliderReducer,
    review: reviewReducer,
    report: reportReducer,
    support: supportReducer,
    notification: notificationReducer,
    version: versionReducer,
    setting: settingReducer,
    news: newsReducer,
    user: userReducer,
    toast: toastReducer,
    theme: themeReducers    
});

const persistedState = loadState();

const store = createStore(
    rootReducer,
    {auth:persistedState?.auth,
    theme:persistedState?.theme 
    },
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    
    saveState({auth:state?.auth, theme:state?.theme})
});

export default store;

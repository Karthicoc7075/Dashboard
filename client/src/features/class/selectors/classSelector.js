export const getAllClassesSelector = (state)=> state.class.classes;
export const getClassSelector = (state)=> state.class.class;
export const classSubjectsSelector = (state)=> state.class.classSubjects;
export const loadingSelector = (state)=> state.class.loading;
export const getLoadingSelector = (state)=> state.class.getLoading;
export const createLoadingSelector = (state)=> state.class.createLoading;
export const updateLoadingSelector = (state)=> state.class.updateLoading;
export const deleteLoadingSelector = (state)=> state.class.deleteLoading;

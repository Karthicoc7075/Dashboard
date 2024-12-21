export const getSubjectsSelector = (state) => state.subject.subjects;
export const getSubjectSelector = (state) => state.subject.subject;
export const loadingSelector = (state) => state.subject.loading;
export const getLoadingSelector = (state) => state.subject.getLoading;
export const createLoadingSelector = (state) => state.subject.createLoading;
export const updateLoadingSelector = (state) => state.subject.updateLoading;
export const deleteLoadingSelector = (state) => state.subject.deleteLoading;
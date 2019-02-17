/* tslint:disable:no-console */
export const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("dispatching", action);
    const result = next(action);
    console.debug("next state", store.getState());
    console.groupEnd();
    return result;
};

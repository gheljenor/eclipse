import {Action, AnyAction, combineReducers, Reducer, ReducersMapObject} from "redux";

export type ExtendedReducer<S = any, A extends Action = AnyAction, G = any> = (
    state: S | undefined,
    action: A,
    globalState?: G | undefined,
) => S;

export type ExtendedReducersMapObject<S = any, A extends Action = Action> = {
    [K in keyof S]: ExtendedReducer<S[K], A, S>
};

export function combineReducersExtended<S>(
    reducers: ExtendedReducersMapObject<S, any>,
): Reducer<S>;
export function combineReducersExtended<S, A extends Action = AnyAction>(
    reducers: ExtendedReducersMapObject<S, A>,
): Reducer<S, A>;

export function combineReducersExtended<S>(reducers: ExtendedReducersMapObject<S, any>): Reducer<S> {
    const result = function (state: S, action) {
        const wrappedReducers: ReducersMapObject<S, any> = {} as ReducersMapObject<S, any>;

        for (const key in reducers) {
            const reducer = reducers[key];
            wrappedReducers[key] = (slice, act) => reducer(slice, act, state);
        }

        return combineReducers(wrappedReducers)(state, action);
    };

    return result as Reducer<S>;
}

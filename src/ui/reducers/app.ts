import {ACTION_APP_AUTOSIM, actionAppAutoSim} from "../app/actions";

export type AppState = {
    autosim: boolean;
    summaryState: "empty" | "pending" | "ready";
    duration: boolean | number;
};

const defaultState: AppState = {
    autosim: false,
    summaryState: "empty",
    duration: false,
};

const actions = {
    [ACTION_APP_AUTOSIM]: (state: AppState, action: ReturnType<typeof actionAppAutoSim>): AppState => {
        return {...state, autosim: action.value};
    },
};

export function app(state: AppState = defaultState, action): AppState {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

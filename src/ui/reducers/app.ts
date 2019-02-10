import {ACTION_APP_AUTOSIM} from "../app/actions";

export interface IAppState {
    autosim: boolean;
    summaryState: "empty" | "pending" | "ready";
    duration: boolean | number;
}

const defaultState: IAppState = {
    autosim: false,
    summaryState: "empty",
    duration: false,
};

export function app(state: IAppState = defaultState, action) {
    switch (action.type) {
        case ACTION_APP_AUTOSIM:
            return {...state, autosim: action.value};
    }

    return state;
}

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

type Actions = ReturnType<typeof actionAppAutoSim>;

export function app(state: AppState = defaultState, action: Actions): AppState {
    switch (action.type) {
        case ACTION_APP_AUTOSIM:
            return {...state, autosim: action.value};
    }

    return state;
}

import {ACTION_APP_SIMULATE, actionAppSimulate} from "../app/actions";
import {SummaryState} from "../components/summary/component";
import {simulate} from "../lib/simulate";
import {State} from "./state";

const defaultState: SummaryState = {
    outcomes: {},
    results: {},
    duration: 0,
    state: "empty",
};

const actions = {
    [ACTION_APP_SIMULATE]: (
        state: SummaryState,
        action: ReturnType<typeof actionAppSimulate>,
        globalState: State,
    ): SummaryState => {
        const ts = Date.now();
        const results = simulate(globalState);
        const duration = Date.now() - ts;

        return {
            ...results,
            state: "ready",
            duration,
        };
    },
};

export function summary(state: SummaryState = defaultState, action, globalState: State): SummaryState {
    if (actions[action.type]) {
        return actions[action.type](state, action, globalState);
    }

    return state;
}

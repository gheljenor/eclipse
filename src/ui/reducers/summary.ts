import {ACTION_APP_SIMULATE, actionAppSimulate} from "../app/actions";
import {SummaryState} from "../components/summary/component";
import {simulate} from "../lib/simulate";
import {State} from "./state";

const actions = {
    [ACTION_APP_SIMULATE]: (state: State, action: ReturnType<typeof actionAppSimulate>): State => {
        const ts = Date.now();
        const results = simulate(state);
        const duration = Date.now() - ts;

        return {
            ...state,
            summary: results,
            app: {
                ...state.app,
                summaryState: "ready",
                duration,
            },
        };
    },
};

export function summaryGlobal(state: State, action): State {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

export function summary(state: SummaryState = {outcomes: {}, results: {}}): SummaryState {
    return state;
}

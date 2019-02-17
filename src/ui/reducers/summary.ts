import {
    ACTION_APP_SIMULATE, ACTION_APP_SIMULATE_FAILED, ACTION_APP_SIMULATE_READY,
    actionAppSimulate, actionAppSimulateFailed, actionAppSimulateReady,
} from "../app/actions";
import {SummaryState} from "../components/summary/component";
import {State} from "./state";

const defaultState: SummaryState = {
    outcomes: {},
    results: {},
    duration: 0,
    state: "empty",
};

const actions = {
    [ACTION_APP_SIMULATE](state: SummaryState, action: ReturnType<typeof actionAppSimulate>): SummaryState {
        return {...state, state: "pending"};
    },
    [ACTION_APP_SIMULATE_READY](state: SummaryState, action: ReturnType<typeof actionAppSimulateReady>): SummaryState {
        return {...action.value, state: "ready"};
    },
    [ACTION_APP_SIMULATE_FAILED](
        state: SummaryState,
        action: ReturnType<typeof actionAppSimulateFailed>,
    ): SummaryState {
        return {...state, state: "empty"};
    },
};

export function summary(state: SummaryState = defaultState, action, globalState: State): SummaryState {
    if (actions[action.type]) {
        return actions[action.type](state, action, globalState);
    }

    return state;
}

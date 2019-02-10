import {ACTION_APP_SIMULATE} from "../app/actions";
import {ISummaryState} from "../components/summary/component";
import {simulate} from "../lib/simulate";
import {IState} from "./i-state";

export function summaryGlobal(state: IState, action) {
    switch (action.type) {
        case ACTION_APP_SIMULATE:
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
    }

    return state;
}

export function summary(state: ISummaryState = {outcomes: {}, results: {}}) {
    return state;
}

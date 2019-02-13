import {ACTION_APP_SIMULATE, actionAppSimulate} from "../app/actions";
import {SummaryState} from "../components/summary/component";
import {simulate} from "../lib/simulate";
import {State} from "./state";

type Actions = ReturnType<typeof actionAppSimulate>;

export function summaryGlobal(state: State, action: Actions): State {
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

export function summary(state: SummaryState = {outcomes: {}, results: {}}): SummaryState {
    return state;
}

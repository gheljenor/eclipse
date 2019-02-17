import {SummaryResult} from "../components/summary/component";

export const ACTION_APP_SIMULATE = Symbol("ACTION_APP_SIMULATE");
export const ACTION_APP_SIMULATE_READY = Symbol("ACTION_APP_SIMULATE_READY");
export const ACTION_APP_SIMULATE_FAILED = Symbol("ACTION_APP_SIMULATE_FAILED");
export const ACTION_APP_AUTOSIM = Symbol("ACTION_APP_AUTOSIM");

type AppSimulateReadyAction = {
    type: typeof ACTION_APP_SIMULATE_READY,
    value: SummaryResult,
};

type AppSimulateFailedAction = {
    type: typeof ACTION_APP_SIMULATE_FAILED,
    error: Error,
};

export function actionAppSimulate(): { type: typeof ACTION_APP_SIMULATE } {
    return {type: ACTION_APP_SIMULATE};
}

export function actionAppSimulateReady(value: SummaryResult): AppSimulateReadyAction {
    return {type: ACTION_APP_SIMULATE_READY, value};
}

export function actionAppSimulateFailed(error: Error): AppSimulateFailedAction {
    return {type: ACTION_APP_SIMULATE_FAILED, error};
}

export function actionAppAutoSim(value): { type: typeof ACTION_APP_AUTOSIM, value: boolean } {
    return {type: ACTION_APP_AUTOSIM, value};
}

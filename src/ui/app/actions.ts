export const ACTION_APP_SIMULATE = Symbol("ACTION_APP_SIMULATE");
export const ACTION_APP_AUTOSIM = Symbol("ACTION_APP_AUTOSIM");

export function actionAppSimulate() {
    return {type: ACTION_APP_SIMULATE};
}

export function actionAppAutoSim(value) {
    return {type: ACTION_APP_AUTOSIM, value};
}

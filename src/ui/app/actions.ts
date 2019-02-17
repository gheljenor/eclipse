export const ACTION_APP_SIMULATE = Symbol("ACTION_APP_SIMULATE");
export const ACTION_APP_AUTOSIM = Symbol("ACTION_APP_AUTOSIM");

export function actionAppSimulate(): { type: typeof ACTION_APP_SIMULATE } {
    return {type: ACTION_APP_SIMULATE};
}

export function actionAppAutoSim(value): { type: typeof ACTION_APP_AUTOSIM, value: boolean } {
    return {type: ACTION_APP_AUTOSIM, value};
}

export const ACTION_SHIP_ADD = Symbol("ACTION_SHIP_ADD");
export const ACTION_SHIP_REMOVE = Symbol("ACTION_SHIP_REMOVE");

const shipCounters = {};

export function actionShipAdd(playerId) {
    shipCounters[playerId] = shipCounters[playerId] || 0;
    const shipId = playerId + ":" + shipCounters[playerId]++;
    return {type: ACTION_SHIP_ADD, playerId, shipId};
}

export function actionShipRemove(playerId, shipId) {
    return {type: ACTION_SHIP_REMOVE, playerId, shipId};
}

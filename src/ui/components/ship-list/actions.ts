export const ACTION_SHIP_ADD = Symbol("ACTION_SHIP_ADD");
export const ACTION_SHIP_REMOVE = Symbol("ACTION_SHIP_REMOVE");

const shipCounters = {};

type ShipAction<Type> = {
    type: Type;
    playerId: string;
    shipId: string;
};

export function actionShipAdd(playerId): ShipAction<typeof ACTION_SHIP_ADD> {
    shipCounters[playerId] = shipCounters[playerId] || 0;
    const shipId = playerId + ":" + shipCounters[playerId]++;
    return {type: ACTION_SHIP_ADD, playerId, shipId};
}

export function actionShipRemove(playerId, shipId): ShipAction<typeof ACTION_SHIP_REMOVE> {
    return {type: ACTION_SHIP_REMOVE, playerId, shipId};
}

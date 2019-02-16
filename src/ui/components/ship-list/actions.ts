import Ship, {ShipState} from "../ship/component";

export const ACTION_SHIP_ADD = Symbol("ACTION_SHIP_ADD");
export const ACTION_SHIP_REMOVE = Symbol("ACTION_SHIP_REMOVE");

type ShipActionAdd = {
    type: typeof ACTION_SHIP_ADD;
    playerId: string;
    value: ShipState;
};

type ShipActionRemove = {
    type: typeof ACTION_SHIP_REMOVE;
    playerId: string;
    shipId: number;
};

export function actionShipAdd(playerId: string, value: ShipState = Ship.defaultState): ShipActionAdd {
    return {type: ACTION_SHIP_ADD, playerId, value};
}

export function actionShipRemove(playerId: string, shipId: number): ShipActionRemove {
    return {type: ACTION_SHIP_REMOVE, playerId, shipId};
}

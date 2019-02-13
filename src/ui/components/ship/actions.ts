import {ShipState} from "./component";

export const ACTION_SHIP_UPDATE = Symbol("ACTION_SHIP_UPDATE");

type ShipModAction = {
    type: typeof ACTION_SHIP_UPDATE;
    shipId: string;
    props: Partial<ShipState>
};

export function actionShipUpdate(shipId: string, props: Partial<ShipState>): ShipModAction {
    return {type: ACTION_SHIP_UPDATE, shipId, props};
}

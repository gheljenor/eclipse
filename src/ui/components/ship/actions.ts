import {IShipState} from "./component";

export const ACTION_SHIP_UPDATE = Symbol("ACTION_SHIP_UPDATE");

export function actionShipUpdate(shipId: string, props: Partial<IShipState>) {
    return {type: ACTION_SHIP_UPDATE, shipId, props};
}

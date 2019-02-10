import {IInputWeaponState} from "./component";

export const ACTION_WEAPON_UPDATE = Symbol("ACTION_WEAPON_UPDATE");

export function actionWeaponUpdate(weaponId: string, value: IInputWeaponState) {
    return {type: ACTION_WEAPON_UPDATE, weaponId, value};
}

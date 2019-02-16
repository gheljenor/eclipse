import {InputWeaponState} from "./component";

export const ACTION_WEAPON_UPDATE = Symbol("ACTION_WEAPON_UPDATE");

type WeaponModAction = {
    type: typeof ACTION_WEAPON_UPDATE;
    weaponId: number;
    value: InputWeaponState;
};

export function actionWeaponUpdate(weaponId: number, value: InputWeaponState): WeaponModAction {
    return {type: ACTION_WEAPON_UPDATE, weaponId, value};
}

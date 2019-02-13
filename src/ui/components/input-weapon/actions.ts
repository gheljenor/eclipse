import {InputWeaponState} from "./component";

export const ACTION_WEAPON_UPDATE = Symbol("ACTION_WEAPON_UPDATE");

type WeaponModAction = {
    type: typeof ACTION_WEAPON_UPDATE;
    weaponId: string;
    value: InputWeaponState;
};

export function actionWeaponUpdate(weaponId: string, value: InputWeaponState): WeaponModAction {
    return {type: ACTION_WEAPON_UPDATE, weaponId, value};
}

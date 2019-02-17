import InputWeapon from "../input-weapon/component";
import {InputWeaponState} from "../input-weapon/component";

export const ACTION_WEAPON_ADD = Symbol("ACTION_WEAPON_ADD");
export const ACTION_WEAPON_REMOVE = Symbol("ACTION_WEAPON_REMOVE");

type WeaponActionAdd = {
    type: typeof ACTION_WEAPON_ADD;
    shipId: number;
    value: InputWeaponState
};

type WeaponActionRemove = {
    type: typeof ACTION_WEAPON_REMOVE;
    shipId: number;
    weaponId: number;
};

export function actionWeaponAdd(shipId: number, value: InputWeaponState = InputWeapon.defaultState): WeaponActionAdd {
    return {type: ACTION_WEAPON_ADD, shipId, value};
}

export function actionWeaponRemove(shipId: number, weaponId: number): WeaponActionRemove {
    return {type: ACTION_WEAPON_REMOVE, shipId, weaponId};
}

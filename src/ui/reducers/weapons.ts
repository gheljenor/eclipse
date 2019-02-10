import InputWeapon, {IInputWeaponState} from "../components/input-weapon/component";

import {ACTION_WEAPON_UPDATE} from "../components/input-weapon/actions";
import {ACTION_SHIP_REMOVE} from "../components/ship-list/actions";
import {ACTION_WEAPON_ADD, ACTION_WEAPON_REMOVE} from "../components/weapon-list/actions";

interface IWeaponEntityState {
    id: string;
    value: IInputWeaponState;
}

export type IWeaponsState = IWeaponEntityState[];

export function weapons(state: IWeaponsState = [], action) {
    switch (action.type) {
        case ACTION_WEAPON_ADD:
            return state.concat({id: action.weaponId, value: InputWeapon.defaultState});

        case ACTION_WEAPON_REMOVE:
            return state.filter(({id}) => id !== action.weaponId);

        case ACTION_WEAPON_UPDATE:
            return state.map((weapon) => weapon.id !== action.weaponId ? weapon : {
                ...weapon,
                value: action.value,
            });

        case ACTION_SHIP_REMOVE:
            return state.filter(({id}) => !id.startsWith(action.shipId + ":"));
    }

    return state;
}

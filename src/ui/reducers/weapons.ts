import InputWeapon, {InputWeaponState} from "../components/input-weapon/component";

import {ACTION_WEAPON_UPDATE, actionWeaponUpdate} from "../components/input-weapon/actions";
import {ACTION_SHIP_REMOVE, actionShipRemove} from "../components/ship-list/actions";
import {
    ACTION_WEAPON_ADD,
    ACTION_WEAPON_REMOVE,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../components/weapon-list/actions";

export type WeaponsState = {
    [id: string]: InputWeaponState;
};

type Actions = ReturnType<typeof actionWeaponAdd>
    | ReturnType<typeof actionWeaponRemove>
    | ReturnType<typeof actionShipRemove>
    | ReturnType<typeof actionWeaponUpdate>;

export function weapons(state: WeaponsState = {}, action: Actions): WeaponsState {
    switch (action.type) {
        case ACTION_WEAPON_ADD:
            return {...state, [action.weaponId]: InputWeapon.defaultState};

        case ACTION_WEAPON_REMOVE: {
            const nextState = {...state};
            delete nextState[action.weaponId];
            return nextState;
        }

        case ACTION_WEAPON_UPDATE:
            return {...state, [action.weaponId]: action.value};

        case ACTION_SHIP_REMOVE: {
            const nextState = {...state};
            Object.keys(state).forEach((id) => {
                if (id.startsWith(action.shipId + ":")) {
                    delete nextState[id];
                }
            });
            return nextState;
        }
    }

    return state;
}

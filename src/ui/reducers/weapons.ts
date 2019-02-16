import InputWeapon, {InputWeaponState} from "../components/input-weapon/component";

import {ACTION_WEAPON_UPDATE, actionWeaponUpdate} from "../components/input-weapon/actions";
import {ACTION_SHIP_REMOVE, actionShipRemove} from "../components/ship-list/actions";
import {
    ACTION_WEAPON_ADD,
    ACTION_WEAPON_REMOVE,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../components/weapon-list/actions";
import {StateUpdateError} from "../lib/state-update-error";

export type WeaponsState = {
    [id: string]: InputWeaponState;
};

const actions = {
    [ACTION_WEAPON_ADD]: (state: WeaponsState, action: ReturnType<typeof actionWeaponAdd>): WeaponsState => {
        if (state[action.weaponId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_WEAPON_COLLISION, action);
        }

        return {...state, [action.weaponId]: InputWeapon.defaultState};
    },
    [ACTION_WEAPON_REMOVE]: (state: WeaponsState, action: ReturnType<typeof actionWeaponRemove>): WeaponsState => {
        if (!state[action.weaponId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_WEAPON_NOT_FOUND, action);
        }

        const nextState = {...state};
        delete nextState[action.weaponId];
        return nextState;
    },
    [ACTION_WEAPON_UPDATE]: (state: WeaponsState, action: ReturnType<typeof actionWeaponUpdate>): WeaponsState => {
        if (!state[action.weaponId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_WEAPON_NOT_FOUND, action);
        }

        return {...state, [action.weaponId]: action.value};
    },
    [ACTION_SHIP_REMOVE]: (state: WeaponsState, action: ReturnType<typeof actionShipRemove>): WeaponsState => {
        const nextState = {...state};
        Object.keys(state).forEach((id) => {
            if (id.startsWith(action.shipId + ":")) {
                delete nextState[id];
            }
        });
        return nextState;
    },
};

export function weapons(state: WeaponsState = {}, action): WeaponsState {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

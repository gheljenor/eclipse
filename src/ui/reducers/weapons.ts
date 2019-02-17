import {InputWeaponState} from "../components/input-weapon/component";

import {ACTION_WEAPON_UPDATE, actionWeaponUpdate} from "../components/input-weapon/actions";
import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";
import {
    ACTION_WEAPON_ADD, ACTION_WEAPON_REMOVE,
    actionWeaponAdd, actionWeaponRemove,
} from "../components/weapon-list/actions";

import {StateUpdateError} from "../lib/state-update-error";
import {State} from "./state";

export type WeaponsState = {
    counter: number;
    list: { [id: number]: InputWeaponState };
};

const defaultState: WeaponsState = {counter: -1, list: {}};

const actions = {
    [ACTION_WEAPON_ADD](state: WeaponsState, action: ReturnType<typeof actionWeaponAdd>): WeaponsState {
        const weaponId = state.counter + 1;

        return {
            counter: weaponId,
            list: {...state.list, [weaponId]: action.value},
        };
    },
    [ACTION_WEAPON_REMOVE](state: WeaponsState, action: ReturnType<typeof actionWeaponRemove>): WeaponsState {
        if (!state.list[action.weaponId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_WEAPON_NOT_FOUND, action);
        }

        const list = {...state.list};
        delete list[action.weaponId];

        return {...state, list};
    },
    [ACTION_WEAPON_UPDATE](state: WeaponsState, action: ReturnType<typeof actionWeaponUpdate>): WeaponsState {
        if (!state.list[action.weaponId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_WEAPON_NOT_FOUND, action);
        }

        return {...state, list: {...state.list, [action.weaponId]: action.value}};
    },
    [ACTION_SHIP_ADD](
        state: WeaponsState,
        action: ReturnType<typeof actionShipAdd>,
        globalState: State,
    ): WeaponsState {
        const shipId = globalState.ships.counter + 1;
        return weapons(state, actionWeaponAdd(shipId), globalState);
    },
    [ACTION_SHIP_REMOVE](
        state: WeaponsState,
        action: ReturnType<typeof actionShipRemove>,
        globalState: State,
    ): WeaponsState {
        if (!globalState.ships.list[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const list = {...state.list};
        globalState.ships.list[action.shipId].weapons.forEach((weaponId) => delete list[weaponId]);

        return {...state, list};
    },
};

export function weapons(state: WeaponsState = defaultState, action, globalState: State): WeaponsState {
    if (actions[action.type]) {
        return actions[action.type](state, action, globalState);
    }

    return state;
}

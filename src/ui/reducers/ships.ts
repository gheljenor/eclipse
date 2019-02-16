import Ship, {ShipState} from "../components/ship/component";

import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";
import {ACTION_SHIP_UPDATE, actionShipUpdate} from "../components/ship/actions";
import {
    ACTION_WEAPON_ADD,
    ACTION_WEAPON_REMOVE,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../components/weapon-list/actions";
import {StateUpdateError} from "../lib/state-update-error";

type ShipValueState = ShipState & {
    weapons: string[];
};

export type ShipsState = {
    [id: string]: ShipValueState;
};

const actions = {
    [ACTION_WEAPON_ADD](state: ShipsState, action: ReturnType<typeof actionWeaponAdd>): ShipsState {
        if (!state[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const weapons = [...state[action.shipId].weapons, action.weaponId];

        return {
            ...state,
            [action.shipId]: {
                ...state[action.shipId],
                weapons,
            },
        };
    },
    [ACTION_WEAPON_REMOVE](state: ShipsState, action: ReturnType<typeof actionWeaponRemove>): ShipsState {
        if (!state[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const weapons = state[action.shipId].weapons.filter((id) => id !== action.weaponId);

        return {
            ...state,
            [action.shipId]: {
                ...state[action.shipId],
                weapons,
            },
        };
    },
    [ACTION_SHIP_UPDATE](state: ShipsState, action: ReturnType<typeof actionShipUpdate>): ShipsState {
        if (!state[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        return {
            ...state,
            [action.shipId]: {
                ...state[action.shipId],
                ...action.props,
            },
        };
    },
    [ACTION_SHIP_ADD](state: ShipsState, action: ReturnType<typeof actionShipAdd>): ShipsState {
        if (state[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_COLLISION, action);
        }

        return {
            ...state,
            [action.shipId]: {...Ship.defaultState, weapons: []},
        };
    },
    [ACTION_SHIP_REMOVE](state: ShipsState, action: ReturnType<typeof actionShipRemove>): ShipsState {
        if (!state[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const nextState = {...state};
        delete nextState[action.shipId];
        return nextState;
    },
};

export function ships(state: ShipsState = {}, action): ShipsState {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

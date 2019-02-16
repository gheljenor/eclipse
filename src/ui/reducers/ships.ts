import {ShipState} from "../components/ship/component";

import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";
import {ACTION_SHIP_UPDATE, actionShipUpdate} from "../components/ship/actions";
import {
    ACTION_WEAPON_ADD, ACTION_WEAPON_REMOVE,
    actionWeaponAdd, actionWeaponRemove,
} from "../components/weapon-list/actions";

import {StateUpdateError} from "../lib/state-update-error";
import {State} from "./state";

type ShipValueState = ShipState & {
    weapons: number[];
};

export type ShipsState = {
    counter: number;
    list: { [id: number]: ShipValueState };
};

const defaultState = {counter: -1, list: {}};

const actions = {
    [ACTION_WEAPON_ADD](state: ShipsState, action: ReturnType<typeof actionWeaponAdd>, globalState: State): ShipsState {
        if (!state.list[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const weaponId = globalState.weapons.counter + 1;
        const ship = {...state.list[action.shipId]};
        const weapons = [...ship.weapons, weaponId];

        return {
            ...state,
            list: {
                ...state.list,
                [action.shipId]: {...ship, weapons},
            },
        };
    },
    [ACTION_WEAPON_REMOVE](state: ShipsState, action: ReturnType<typeof actionWeaponRemove>): ShipsState {
        if (!state.list[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const weapons = state.list[action.shipId].weapons.filter((id) => id !== action.weaponId);

        return {
            ...state,
            list: {
                ...state.list,
                [action.shipId]: {...state.list[action.shipId], weapons},
            },
        };
    },
    [ACTION_SHIP_UPDATE](state: ShipsState, action: ReturnType<typeof actionShipUpdate>): ShipsState {
        if (!state.list[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        return {
            ...state,
            list: {
                ...state.list,
                [action.shipId]: {...state.list[action.shipId], ...action.props},
            },
        };
    },
    [ACTION_SHIP_ADD](state: ShipsState, action: ReturnType<typeof actionShipAdd>, globalState: State): ShipsState {
        const shipId = state.counter + 1;
        const weaponId = globalState.weapons.counter + 1;

        return {
            counter: shipId,
            list: {
                ...state.list,
                [shipId]: {...action.value, weapons: [weaponId]},
            },
        };
    },
    [ACTION_SHIP_REMOVE](state: ShipsState, action: ReturnType<typeof actionShipRemove>): ShipsState {
        if (!state.list[action.shipId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_SHIP_NOT_FOUND, action);
        }

        const list = {...state.list};
        delete list[action.shipId];

        return {...state, list};
    },
};

export function ships(state: ShipsState = defaultState, action, globalState: State): ShipsState {
    if (actions[action.type]) {
        return actions[action.type](state, action, globalState);
    }

    return state;
}

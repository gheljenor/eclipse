import Ship, {ShipState} from "../components/ship/component";

import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";
import {ACTION_SHIP_UPDATE, actionShipUpdate} from "../components/ship/actions";
import {
    ACTION_WEAPON_ADD,
    ACTION_WEAPON_REMOVE,
    actionWeaponAdd,
    actionWeaponRemove,
} from "../components/weapon-list/actions";

type ShipValueState = ShipState & {
    weapons: string[];
};

export type ShipsState = {
    [id: string]: ShipValueState;
};

type Actions = ReturnType<typeof actionWeaponAdd>
    | ReturnType<typeof actionWeaponRemove>
    | ReturnType<typeof actionShipAdd>
    | ReturnType<typeof actionShipRemove>
    | ReturnType<typeof actionShipUpdate>;

export function ships(state: ShipsState = {}, action: Actions): ShipsState {
    switch (action.type) {
        case ACTION_WEAPON_ADD: {
            const weapons = [...state[action.shipId].weapons, action.weaponId];
            return {
                ...state,
                [action.shipId]: {
                    ...state[action.shipId],
                    weapons,
                },
            };
        }

        case ACTION_WEAPON_REMOVE: {
            const weapons = state[action.shipId].weapons.filter((id) => id !== action.weaponId);
            return {
                ...state,
                [action.shipId]: {
                    ...state[action.shipId],
                    weapons,
                },
            };
        }

        case ACTION_SHIP_UPDATE:
            return {
                ...state,
                [action.shipId]: {
                    ...state[action.shipId],
                    ...action.props,
                },
            };

        case ACTION_SHIP_ADD:
            return {
                ...state,
                [action.shipId]: {...Ship.defaultState, weapons: []},
            };

        case ACTION_SHIP_REMOVE: {
            const nextState = {...state};
            delete nextState[action.shipId];
            return nextState;
        }
    }

    return state;
}

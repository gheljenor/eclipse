import Ship, {IShipState} from "../components/ship/component";

import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE} from "../components/ship-list/actions";
import {ACTION_SHIP_UPDATE} from "../components/ship/actions";
import {ACTION_WEAPON_ADD, ACTION_WEAPON_REMOVE} from "../components/weapon-list/actions";

interface IShipValueState extends IShipState {
    weapons: string[];
}

interface IShipEntityState {
    id: string;
    value: IShipValueState;
}

export type IShipsState = IShipEntityState[];

export function ships(state: IShipsState = [], action) {
    switch (action.type) {
        case ACTION_WEAPON_ADD:
            return state.map((ship) => ship.id !== action.shipId ? ship : {
                ...ship,
                value: {
                    ...ship.value,
                    weapons: ship.value.weapons.concat(action.weaponId),
                },
            });

        case ACTION_WEAPON_REMOVE:
            return state.map((ship) => ship.id !== action.shipId ? ship : {
                ...ship,
                value: {
                    ...ship.value,
                    weapons: ship.value.weapons.filter((id) => id !== action.weaponId),
                },
            });

        case ACTION_SHIP_UPDATE:
            return state.map((ship) => ship.id !== action.shipId ? ship : {
                ...ship,
                value: {...ship.value, ...action.props},
            });

        case ACTION_SHIP_ADD:
            return state.concat({
                id: action.shipId,
                value: {...Ship.defaultState, weapons: []},
            });

        case ACTION_SHIP_REMOVE:
            return state.filter(({id}) => id !== action.shipId);
    }

    return state;
}

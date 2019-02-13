import {ACTION_PLAYER_UPDATE, actionPlayerUpdate} from "../components/player/actions";
import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";

type IPlayerState = {
    name: string;
    ships: string[];
};

export type PlayersState = {
    first: IPlayerState;
    second: IPlayerState;
    defender: "first" | "second";
};

const defaultPlayers: PlayersState = {
    first: {name: "Player", ships: []},
    second: {name: "Enemy", ships: []},
    defender: "second",
};

const otherPlayer = {first: "second", second: "first"};

type Actions = ReturnType<typeof actionPlayerUpdate>
    | ReturnType<typeof actionShipAdd>
    | ReturnType<typeof actionShipRemove>;

export function players(state: PlayersState = defaultPlayers, action: Actions): PlayersState {
    switch (action.type) {
        case ACTION_SHIP_ADD:
            return {
                ...state,
                [action.playerId]: {
                    ...state[action.playerId],
                    ships: [...state[action.playerId].ships, action.shipId],
                },
            };

        case ACTION_SHIP_REMOVE:
            return {
                ...state,
                [action.playerId]: {
                    ...state[action.playerId],
                    ships: state[action.playerId].ships.filter((id) => id !== action.shipId),
                },
            };

        case ACTION_PLAYER_UPDATE:
            if (action.props.hasOwnProperty("defender")) {
                const defender = action.props.defender ? action.playerId : otherPlayer[action.playerId];
                state = {...state, defender};
            }

            if (action.props.name) {
                state = {
                    ...state,
                    [action.playerId]: {
                        ...state[action.playerId],
                        name: action.props.name,
                    },
                };
            }

            return state;

    }

    return state;
}

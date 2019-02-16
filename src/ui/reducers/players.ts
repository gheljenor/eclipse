import {ACTION_PLAYER_UPDATE, actionPlayerUpdate} from "../components/player/actions";
import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE, actionShipAdd, actionShipRemove} from "../components/ship-list/actions";
import {StateUpdateError} from "../lib/state-update-error";

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

const actions = {
    [ACTION_SHIP_ADD]: (state: PlayersState, action: ReturnType<typeof actionShipAdd>): PlayersState => {
        if (!state[action.playerId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_PLAYER_NOT_FOUND, action);
        }

        return {
            ...state,
            [action.playerId]: {
                ...state[action.playerId],
                ships: [...state[action.playerId].ships, action.shipId],
            },
        };
    },
    [ACTION_SHIP_REMOVE]: (state: PlayersState, action: ReturnType<typeof actionShipRemove>): PlayersState => {
        if (!state[action.playerId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_PLAYER_NOT_FOUND, action);
        }

        return {
            ...state,
            [action.playerId]: {
                ...state[action.playerId],
                ships: state[action.playerId].ships.filter((id) => id !== action.shipId),
            },
        };
    },
    [ACTION_PLAYER_UPDATE]: (state: PlayersState, action: ReturnType<typeof actionPlayerUpdate>): PlayersState => {
        if (!state[action.playerId]) {
            throw new StateUpdateError(StateUpdateError.ERROR_PLAYER_NOT_FOUND, action);
        }

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
    },
};

export function players(state: PlayersState = defaultPlayers, action): PlayersState {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
}

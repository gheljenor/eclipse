import {ACTION_PLAYER_UPDATE} from "../components/player/actions";
import {ACTION_SHIP_ADD, ACTION_SHIP_REMOVE} from "../components/ship-list/actions";

interface IPlayerState {
    name: string;
    ships: string[];
}

export interface IPlayersState {
    first: IPlayerState;
    second: IPlayerState;
    defender: "first" | "second";
}

const defaultPlayers: IPlayersState = {
    first: {name: "Player", ships: []},
    second: {name: "Enemy", ships: []},
    defender: "second",
};

const otherPlayer = {first: "second", second: "first"};

export function players(state: IPlayersState = defaultPlayers, action) {
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
                    [action.props.playerId]: {
                        ...state[action.props.playerId],
                        name: action.props.name,
                    },
                };
            }

            return state;

    }

    return state;
}

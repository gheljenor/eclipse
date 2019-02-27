import {applyMiddleware, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {epics} from "./epics";
import {logger} from "./redux-mw/logger";

import {BattleShipType} from "../battle/data/battle-ship";
import {WeaponDamageType, WeaponType} from "../battle/data/weapon";
import {InputWeaponState} from "./components/input-weapon/component";
import {ShipState} from "./components/ship/component";
import {reducers} from "./reducers";
import {State} from "./reducers/state";

const defaultShip: ShipState = {
    type: BattleShipType.interceptor,
    count: 1,
    hp: 1,
    attack: 0,
    defence: 0,
    initiative: 0,
    heal: 0,
};

const defaultWeapon: InputWeaponState = {
    type: WeaponType.gun,
    damage: WeaponDamageType.yellow,
    count: 1,
};

const defaultState: State = {
    app: {autosim: false},
    summary: {
        outcomes: {},
        results: {},
        duration: 0,
        state: "empty",
    },
    players: {
        first: {name: "Player", ships: [0]},
        second: {name: "Enemy", ships: [1]},
        defender: "second",
    },
    ships: {
        counter: 1,
        list: {
            0: {...defaultShip, weapons: [0]},
            1: {...defaultShip, weapons: [1]},
        },
    },
    weapons: {
        counter: 1,
        list: {0: defaultWeapon, 1: defaultWeapon},
    },
};

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
    reducers,
    defaultState,
    applyMiddleware(
        logger,
        epicMiddleware,
    ),
);

epicMiddleware.run(epics);

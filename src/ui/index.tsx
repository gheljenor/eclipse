import * as React from "react";
import * as ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {logger} from "./redux-mw/logger";

import "./index.pcss";

import {EBattleShipType} from "../battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../battle/i-weapon";
import {AppContainer} from "./app";
import {InputWeaponState} from "./components/input-weapon/component";
import {ShipState} from "./components/ship/component";
import {reducers} from "./reducers";
import {State} from "./reducers/state";

const defaultShip: ShipState = {
    type: EBattleShipType.interceptor,
    count: 1,
    hp: 1,
    attack: 0,
    defence: 0,
    initiative: 0,
    heal: 0,
};

const defaultWeapon: InputWeaponState = {
    type: EWeaponType.gun,
    damage: EWeaponDamageType.yellow,
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

const store = createStore(
    reducers,
    defaultState,
    applyMiddleware(
        logger,
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("app"),
);

module.hot.accept();

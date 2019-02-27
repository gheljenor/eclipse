/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from "@storybook/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {BattleShipType} from "../../../battle/data/battle-ship";

import {WeaponDamageType, WeaponType} from "../../../battle/data/weapon";
import {reducers} from "../../reducers";
import {logger} from "../../stories/logger";
import Setup from "./index";

storiesOf("Setup", module)
    .add("default", () => {
        const store = createStore(reducers, {
            players: {
                first: {name: "Player", ships: [0]},
                second: {name: "Enemy", ships: [1]},
                defender: "second",
            },
            ships: {
                counter: 1, list: {
                    0: {
                        type: BattleShipType.interceptor,
                        count: 1,
                        hp: 1,
                        attack: 0,
                        defence: 0,
                        initiative: 0,
                        heal: 0,
                        weapons: [0],
                    },
                    1: {
                        type: BattleShipType.interceptor,
                        count: 1,
                        hp: 1,
                        attack: 0,
                        defence: 0,
                        initiative: 0,
                        heal: 0,
                        weapons: [1],
                    },
                },
            },
            weapons: {
                counter: 1, list: {
                    0: {type: WeaponType.gun, damage: WeaponDamageType.yellow, count: 1},
                    1: {type: WeaponType.gun, damage: WeaponDamageType.yellow, count: 1},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <Setup />
            </Provider>
        );
    });

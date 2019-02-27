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
import {ShipContainer} from "./index";

storiesOf("Ship", module)
    .add("default", () => {
        const store = createStore(reducers, {
            ships: {
                counter: 0, list: {
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
                },
            },
            weapons: {
                counter: 0, list: {
                    0: {type: WeaponType.gun, damage: WeaponDamageType.yellow, count: 1},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <ShipContainer shipId={0} />
            </Provider>
        );
    })
    .add("ancient cruiser", () => {
        const store = createStore(reducers, {
            ships: {
                counter: 0, list: {
                    0: {
                        type: BattleShipType.cruiser,
                        count: 1,
                        hp: 2,
                        attack: 1,
                        defence: 0,
                        initiative: 0,
                        heal: 0,
                        weapons: [0],
                    },
                },
            },
            weapons: {
                counter: 0, list: {
                    0: {type: WeaponType.gun, damage: WeaponDamageType.yellow, count: 2},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <ShipContainer shipId={0} />
            </Provider>
        );
    });

/* tslint:disable:jsx-alignment */

import * as React from "react";

import {State, Store} from "@sambego/storybook-state";
import {storiesOf} from "@storybook/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {EBattleShipType} from "../../../battle/battleship";

import {EWeaponDamageType, EWeaponType} from "../../../battle/i-weapon";
import {reducers} from "../../reducers";
import {logger} from "../../stories/logger";
import {ShipContainer} from "./index";

storiesOf("Ship", module)
    .add("default", () => {
        const store = createStore(reducers, {
            ships: {
                counter: 0, list: {
                    0: {
                        type: EBattleShipType.interceptor,
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
                    0: {type: EWeaponType.gun, damage: EWeaponDamageType.yellow, count: 1},
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
                        type: EBattleShipType.cruiser,
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
                    0: {type: EWeaponType.gun, damage: EWeaponDamageType.yellow, count: 2},
                },
            },
        }, logger());

        return (
            <Provider store={store}>
                <ShipContainer shipId={0} />
            </Provider>
        );
    });

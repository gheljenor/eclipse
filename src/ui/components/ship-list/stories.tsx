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
import {ShipListContainer} from "./index";

storiesOf("ShipList", module)
    .add("default", () => {
        const store = createStore(reducers, {
            players: {
                first: {name: "Player", ships: [0]},
                second: {name: "Enemy", ships: []},
                defender: "second",
            },
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
                <ShipListContainer playerId="first" />
            </Provider>
        );
    });
